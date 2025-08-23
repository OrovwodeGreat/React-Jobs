import ClipLoader from 'react-spinners/ClipLoader'

const Spinner = ({loading}) => {
     const override = {
    display: "block",
    margin: "0 auto",
  };
    return (
        <ClipLoader
            color='#4338ca'
            loading={loading}
            cssOverride={override}
            size={50}
         />
    );
};

export default Spinner;