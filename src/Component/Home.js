import React from 'react';
import FictionIcon from '../assets/images/Fiction.svg';
import NextIcon from '../assets/images/Next.svg';
import PHILOSOPHYIcon from '../assets/images/Philosophy.svg';
import DRAMAIcon from '../assets/images/Drama.svg';
import HISTORYIcon from '../assets/images/History.svg';
import HUMOURIcon from '../assets/images/Humour.svg';
import ADVENTUREIcon from '../assets/images/Adventure.svg';
import POLITICSIcon from '../assets/images/Politics.svg';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'FICTION', icon: FictionIcon },
  { name: 'PHILOSOPHY', icon: PHILOSOPHYIcon },
  { name: 'DRAMA', icon: DRAMAIcon },
  { name: 'HISTORY', icon: HISTORYIcon },
  { name: 'HUMOUR', icon: HUMOURIcon },
  { name: 'ADVENTURE', icon: ADVENTUREIcon },
  { name: 'POLITICS', icon: POLITICSIcon },
];

function CategoryItem({ name, icon }) {
  return (
    <div className="col-md-6 mt-4">
      <Link to="/products" className='text-decoration-none'>
      <div className="category-item d-flex align-items-center justify-content-between p-2 w-bg title-box">
        <div className="d-flex align-items-center">
          <div className="category-icon mr-3">
            <img src={icon} alt={`${name} Icon`} className="icon-h pd-r-10" />
          </div>
          <h5 className="mb-0">{name}</h5>
        </div>
        <div className="arrow-icon">
          <img src={NextIcon} alt="Next Icon" className="icon-next" />
        </div>
      </div>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section>
        <div className="container m-container mt-5 pd-25">
          <div className="row bg-img">
            <h1 className="h1-tag text-center">Gutenberg Project</h1>
            <p className="p-tag text-center">
              A social cataloging website that allows you to freely search its database of books, annotations, and reviews.
            </p>
          </div>
          <div className="row">
            {categories.map(category => (
              <CategoryItem key={category.name} name={category.name} icon={category.icon} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
