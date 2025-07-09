import React, {useEffect, useState} from 'react';
import './dashboard.css';

// Sample advertisement data (would normally come from backend)
// const sampleAds = [
//   { id: 1, title: 'Super Summer Sale', description: 'Get 50% off on all electronics this summer!', image: 'https://i.gadgets360cdn.com/large/story-electronics-1200x800_1714660099351.jpg' },
//   { id: 2, title: 'Fashion Fiesta', description: 'Exclusive deals on fashion wear for all ages.', image: 'https://cdn.grabon.in/gograbon/images/web-images/uploads/1617875488697/clothing-offers.jpg' },
//   { id: 3, title: 'Travel the World', description: 'Save big on holiday packages and flights.', image: 'https://fly4less.ca/wp-content/uploads/2024/10/459067211_1179810893181262_6569860732882435714_n-1024x1024.jpg' },
//   { id: 4, title: 'Home Decor Sale', description: 'Refresh your home with modern decor at great prices.', image: 'https://i.pinimg.com/originals/76/1f/ea/761feaf2bb0de797c3e63859e731c3ce.jpg' },
//   { id: 5, title: 'Fitness Gear Discount', description: 'Up to 40% off on gym and fitness equipment!', image: 'https://tse2.mm.bing.net/th/id/OIP.GmadlYnmvWd4VB3OphNxkgHaDV?pid=Api&P=0&h=180' },
//   { id: 6, title: 'Back to School', description: 'Affordable deals on bags, books & stationery.', image: 'https://c8.alamy.com/comp/2EHPHH7/back-to-school-sale-poster-for-september-education-season-vector-promo-advertisement-design-of-school-stationery-student-bag-and-pencils-with-doodl-2EHPHH7.jpg' },
//   { id: 7, title: 'Gadget Deals', description: 'Smartphones, laptops & more — big discounts inside.', image: 'https://i.ytimg.com/vi/-RkVsE3vFhc/maxresdefault.jpg' },
//   { id: 8, title: 'Pet Supplies Promo', description: 'Treats and toys your furry friend will love!', image: 'https://i.ytimg.com/vi/BuLef1qyhDw/maxresdefault.jpg' },
//   { id: 9, title: 'Outdoor Adventure', description: 'Camping gear and accessories for your next trip.', image: 'https://cdn.create.vista.com/downloads/eb3277b4-9f71-44ac-b9c2-5d83082390c5_1024.jpeg' },
//   { id: 10, title: 'Kitchen Essentials', description: 'Cookware and gadgets for your dream kitchen.', image: 'https://www.freebieshark.com/wp-content/uploads/2022/12/Screen-Shot-2022-12-24-at-7.12.18-AM.png' },
//   { id: 11, title: 'Book Bonanza', description: 'Bestsellers and classics at unbeatable prices.', image: 'https://dcvnv1ldeiz2n.cloudfront.net/OD0/Carousel/HERO_UKOD_DE6974_BestSellers.png' },
//   { id: 12, title: 'Tech Accessories', description: 'Chargers, cases, and more for your devices.', image: 'https://i.pinimg.com/originals/bd/6c/e1/bd6ce1b1ae315a1fb45f753b533ce065.jpg' },
//   { id: 13, title: 'Beauty & Care', description: 'Top brands for skincare and cosmetics.', image: 'https://img.freepik.com/premium-psd/cosmetics-beauty-products-makeup-social-media-post-banner-design-template_513912-305.jpg' },
//   { id: 14, title: 'Automotive Deals', description: 'Parts and accessories for your vehicle.', image: 'https://graphiccloud.net/wp-content/uploads/2021/10/Auto-Accessories-Promotional-Flyer-1.jpg' },
//   { id: 15, title: 'Art & Crafts', description: 'Materials and kits for creative minds.', image: 'https://images.creativemarket.com/0.1.0/ps/7579475/1820/1213/m1/fpnw/wm1/xrrpcx0t8wnzxx7fvvdijm3oy4qje5nvn02rpmdkfzxrs3dw16jiskanw5ojfza8-.jpg?1578911566&s=2d0322d7e53727ca4deb90ff0e5d8b33' },
//   { id: 16, title: 'Music Mania', description: 'Instruments, headphones, and more.', image: 'https://9to5toys.com/wp-content/uploads/sites/5/2013/11/guitar-center-black-friday-sale-leak-ad-04.png' },
// ];


// Dashboard component rendering featured ads
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/products/dashboard/all`);
        const data = await response.json();
        setProducts(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function
  }, []);

  /*
MOVE THIS TO YOUR ITEM DETAILS PAGE, i BELIVE ITS PROPS IN REAT TO MOVE DATA FROM ONE PAGE TO ANOTHER
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/products/product_details/686ed2604ae156231e09e2cf`);
        const data = await response.json();
        setProducts(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function
  }, []);

  */


  return (
    <div className="dashboard-wrapper">
      {/* Header section with title and subtitle */}
      <header className="dashboard-header">
        <h1> ADsite</h1>
        <p>Digital Ads for Modern Market</p>
      </header>

      {/* Section for displaying ads */}
      <section className="ad-section">
        <h2> Featured Ads</h2>
        <div className="ad-grid">
          {/* Map through sampleAds to render each ad card */}

          {products.map(ad => (
            <div className="ad-card" key={ad.id}>
              {/* Ad image */}
              <img src={ad.image} alt={ad.title} />
              {/* Ad content: title, description, and button */}
              <div className="ad-content">
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <button className="ad-btn">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
