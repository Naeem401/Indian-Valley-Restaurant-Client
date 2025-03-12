const SectionTitle = ({ subHeading, heading }) => {
    return (
      <div className="text-center my-12">
        <p className="text-[#D99904] text-lg">{subHeading}</p>
        <h2 className="text-3xl lg:text-4xl text-white font-bold border-y-4 w-1/2 mx-auto py-4">
          {heading}
        </h2>
      </div>
    );
  };
  
  export default SectionTitle;