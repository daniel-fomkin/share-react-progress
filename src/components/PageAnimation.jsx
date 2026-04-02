import {motion} from 'framer-motion';

function PageAnimation({children}){
    return(
        <motion.main
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ duration: 0.7 }}
        >
            {children}
        </motion.main>
    );
}

export default PageAnimation;