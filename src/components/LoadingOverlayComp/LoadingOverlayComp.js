import React from 'react';
import { Loop } from '@material-ui/icons';


const LoadingOverlayComp = ({ isLoading }) => (
  <div className="loadingOverlay" style={{ display: isLoading ? 'flex' : 'none' }}>
    <Loop style={{ fontSize: "15vh" }} className={isLoading ? "loadingRotation" : null} />
  </div>
);

export default LoadingOverlayComp;
