import { Search } from 'lucide-react';
import React, { useState, useDeferredValue } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { ProductCard } from './product';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ShareWebcamModal from '../header/smallMeet/footer/modals/webcam/shareWebcam';

export interface IProduct {
  id: string;
  title: string;
  subtitle: string;
  gallery: string[];
  price: number;
  link: string;
}
interface ProductPanelProps {
  products: IProduct[];
}
export default function ProductPanel({ products }: ProductPanelProps) {
  const t = useTranslations('stream');
  const router=useRouter()
  const [keyword, setKeyword] = useState<string>('');
  const [isOpen, setisOpen] =useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState<'AUCTION' | 'BUYING' | 'GIVEAWAY' | 'SOLD'>(
    'AUCTION'
  );

  const filter = useDeferredValue(keyword);
  const filteredProducts = products.filter((el: IProduct) =>
    el.title.includes(filter)
  );

  const webcam = () => {
    setisOpen(true);
  }

  const goback = () =>{
    router.push('/stream');
  }
  const end = () =>{
    const storeRoomId: string | null = localStorage.getItem('latest-stream-id');
    if(storeRoomId !== null){
      const tokenKey = Object.keys(localStorage).find(key => key.startsWith(storeRoomId));
      if(tokenKey) localStorage.removeItem(tokenKey)
    }
    router.push('/stream');
  }
  return (
    <>
      <div className='px-5 text-lg font-medium text-gray-800 dark:text-white'>
        <div>
          <nav className='flex flex-wrap justify-between text-center text-sm font-medium text-gray-500 dark:text-gray-400'>
            <div
              className='w-1/2 md:w-1/4 cursor-pointer p-2 md:p-1'
              onClick={() => setCurrentTab('AUCTION')}
            >
              <div
                className={`inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 w-full ${currentTab === 'AUCTION' ? 'border-primary text-primary' : 'group hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'}`}
              >
                <span>Auction</span>
              </div>
            </div>
            <div
              className='w-1/2 md:w-1/4 cursor-pointer p-2 md:p-1'
              onClick={() => setCurrentTab('BUYING')}
            >
              <div
                className={`inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 w-full ${currentTab === 'BUYING' ? 'border-primary text-primary' : 'group hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'}`}
              >
                <span>Buy</span>
              </div>
            </div>
            <div
              className='w-1/2 md:w-1/4 cursor-pointer p-2 md:p-1'
              onClick={() => setCurrentTab('GIVEAWAY')}
            >
              <div
                className={`inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 w-full ${currentTab === 'GIVEAWAY' ? 'border-primary text-primary' : 'group hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'}`}
              >
                <span>Giveaways</span>
              </div>
            </div>
            <div
              className='w-1/2 md:w-1/4 cursor-pointer p-2 md:p-1'
              onClick={() => setCurrentTab('SOLD')}
            >
              <div
                className={`inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 w-full ${currentTab === 'SOLD' ? 'border-primary text-primary' : 'group hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'}`}
              >
                <span>Sold</span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      { currentTab === 'AUCTION' && (
        <>
          <div className='relative w-full'>
            <Search className='absolute inset-y-0 left-3 my-auto size-4 text-gray-500' />
            <Input
              type='text'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={t('search_product')}
              className='rounded-full pl-12 pr-4'
            />
          </div>
          <span className='ml-4 text-2xl md:ml-8'>
            {filteredProducts.length} {t('products')}
          </span>
          <ScrollArea className='flex-1 rounded-lg bg-background p-4 md:ml-4'>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </ScrollArea>
          <div className='grid grid-cols-2 gap-2'>
            {/* <Button
              variant='outline'
              className='pr-2 flex border-primary text-primary grid-cols-1'
              onClick={webcam}
            >
              {t('webcam')}
            </Button> */}
            <Button
              variant='outline'
              className='pr-2 flex border-primary text-primary grid-cols-1'
              onClick={goback}
            >
              {t('step_out')}
            </Button>
            <Button
              variant='outline'
              className='pl-2 flex border-primary text-primary grid-cols-1'
              onClick={end}
            >
              {t('end')}
            </Button>
          </div>
        </>
      )}
      {
        currentTab === 'BUYING' && (
          <>
            <div className='relative w-full'>
              <Search className='absolute inset-y-0 left-3 my-auto size-4 text-gray-500' />
              <Input
                type='text'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={t('search_product')}
                className='rounded-full pl-12 pr-4'
              />
            </div>
            <span className='ml-4 text-2xl md:ml-8'>
              {filteredProducts.filter(product => currentTab !== 'BUYING' || product.price > 0).length} {t('products')}
            </span>
            <ScrollArea className='flex-1 rounded-lg bg-background p-4 md:ml-4'>
              {filteredProducts
                .filter(product => currentTab !== 'BUYING' || product.price > 0)
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
              ))}
            </ScrollArea>
            <div className='grid grid-cols-2 gap-2'>
              <Button
                variant='outline'
                className='pr-2 flex border-primary text-primary grid-cols-1'
                onClick={goback}
              >
                {t('step_out')}
              </Button>
              <Button
                variant='outline'
                className='pl-2 flex border-primary text-primary grid-cols-1'
                onClick={end}
              >
                {t('end')}
              </Button>
            </div>
          </>
        )
      }
      {/* {isOpen ? (
        <ShareWebcamModal onSelectedDevice={null} />
      ) : null} */}
    </>
  );
}
