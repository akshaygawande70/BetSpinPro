import React from 'react';
import { Spinner } from "@material-tailwind/react";

const CustomLoader = () => (
  <div style={{ padding: '24px' }}>
    <Spinner />
    <div>Fancy Loader...</div>
  </div>
);

export default CustomLoader;
