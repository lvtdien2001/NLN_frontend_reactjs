import CarouselCard from '../../components/CarouselCard';
import HotProducts from '../../components/HotProducts';
import ProductCategories from '../../components/ProductCategories';
import ProductSuggest from '../../components/ProductSuggest';

function Home() {
    return (
        <>
            <CarouselCard />
            <ProductCategories />
            <HotProducts />
            <ProductSuggest />
        </>
    );
}

export default Home
