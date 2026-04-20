'use strict';

function autoReset(setStatus){
    const timeOut = setTimeout(() => {
        setStatus(true);
    }, 1000 * 60 * 6);  

  
    return timeOut;
}
export default autoReset;