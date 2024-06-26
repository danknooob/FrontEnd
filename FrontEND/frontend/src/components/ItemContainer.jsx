import React from 'react';
import Item from './Item';

const ItemContainer = () => {
  return (
    <div className='overflow-x-scroll' >
      <div className='flex gap-10'>
        <Item />
        <Item />
        <Item/>
        <Item/>
        {/* Add more Item components as needed */}
      </div>
    </div>
  );
};

export default ItemContainer;
