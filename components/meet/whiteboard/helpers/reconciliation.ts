'use client';
// eslint-disable-next-line import/no-unresolved
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
// eslint-disable-next-line import/no-unresolved
import type { AppState } from '@excalidraw/excalidraw/types/types';

export const PRECEDING_ELEMENT_KEY = '__precedingElement__';

export type ReconciledElements = readonly ExcalidrawElement[] & {
  _brand: 'reconciledElements';
};

export type BroadcastedExcalidrawElement = ExcalidrawElement & {
  [PRECEDING_ELEMENT_KEY]?: string;
};

export const arrayToMapWithIndex = <T extends { id: string }>(
  elements: readonly T[]
) =>
  elements.reduce((acc, element: T, idx) => {
    acc.set(element.id, [element, idx]);
    return acc;
  }, new Map<string, [element: T, index: number]>());

const shouldDiscardRemoteElement = (
  localAppState: AppState,
  local: ExcalidrawElement | undefined,
  remote: BroadcastedExcalidrawElement
): boolean => {
  if (
    local &&
    // local element is being edited
    (local.id === localAppState.editingElement?.id ||
      local.id === localAppState.resizingElement?.id ||
      local.id === localAppState.draggingElement?.id ||
      // local element is newer
      local.version > remote.version ||
      // resolve conflicting edits deterministically by taking the one with
      // the lowest versionNonce
      (local.version === remote.version &&
        local.versionNonce < remote.versionNonce))
  ) {
    return true;
  }
  return false;
};

export const reconcileElements = (
  localElements: readonly ExcalidrawElement[],
  remoteElements: readonly BroadcastedExcalidrawElement[],
  localAppState: AppState
): ReconciledElements => {
  const localElementsData =
    arrayToMapWithIndex<ExcalidrawElement>(localElements);

  const reconciledElements: ExcalidrawElement[] = localElements.slice();

  const duplicates = new WeakMap<ExcalidrawElement, true>();

  let cursor = 0;
  let offset = 0;

  let remoteElementIdx = -1;
  for (const remoteElement of remoteElements) {
    remoteElementIdx++;

    const local = localElementsData.get(remoteElement.id);

    if (shouldDiscardRemoteElement(localAppState, local?.[0], remoteElement)) {
      if (remoteElement[PRECEDING_ELEMENT_KEY]) {
        delete remoteElement[PRECEDING_ELEMENT_KEY];
      }

      continue;
    }

    // Mark duplicate for removal as it'll be replaced with the remote element
    if (local) {
      // Unless the remote and local elements are the same element in which case
      // we need to keep it as we'd otherwise discard it from the resulting
      // array.
      if (local[0] === remoteElement) {
        continue;
      }
      duplicates.set(local[0], true);
    }

    // parent may not be defined in case the remote client is running an older
    // excalidraw version
    const parent =
      remoteElement[PRECEDING_ELEMENT_KEY] ||
      remoteElements[remoteElementIdx - 1]?.id ||
      null;

    if (parent != null) {
      delete remoteElement[PRECEDING_ELEMENT_KEY];

      // ^ indicates the element is the first in elements array
      if (parent === '^') {
        offset++;
        if (cursor === 0) {
          reconciledElements.unshift(remoteElement);
          localElementsData.set(remoteElement.id, [
            remoteElement,
            cursor - offset,
          ]);
        } else {
          reconciledElements.splice(cursor + 1, 0, remoteElement);
          localElementsData.set(remoteElement.id, [
            remoteElement,
            cursor + 1 - offset,
          ]);
          cursor++;
        }
      } else {
        let idx = localElementsData.has(parent)
          ? localElementsData.get(parent)![1]
          : null;
        if (idx != null) {
          idx += offset;
        }
        if (idx != null && idx >= cursor) {
          reconciledElements.splice(idx + 1, 0, remoteElement);
          offset++;
          localElementsData.set(remoteElement.id, [
            remoteElement,
            idx + 1 - offset,
          ]);
          cursor = idx + 1;
        } else if (idx != null) {
          reconciledElements.splice(cursor + 1, 0, remoteElement);
          offset++;
          localElementsData.set(remoteElement.id, [
            remoteElement,
            cursor + 1 - offset,
          ]);
          cursor++;
        } else {
          reconciledElements.push(remoteElement);
          localElementsData.set(remoteElement.id, [
            remoteElement,
            reconciledElements.length - 1 - offset,
          ]);
        }
      }
      // no parent z-index information, local element exists → replace in place
    } else if (local) {
      reconciledElements[local[1]] = remoteElement;
      localElementsData.set(remoteElement.id, [remoteElement, local[1]]);
      // otherwise push to the end
    } else {
      reconciledElements.push(remoteElement);
      localElementsData.set(remoteElement.id, [
        remoteElement,
        reconciledElements.length - 1 - offset,
      ]);
    }
  }

  const ret: readonly ExcalidrawElement[] = reconciledElements.filter(
    (element) => !duplicates.has(element)
  );

  return ret as ReconciledElements;
};
