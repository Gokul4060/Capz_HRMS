import Banner from "./components/profile";
import General from "./components/General";
import Upload from "./components/Upload";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      
        <div className="mt-4  z-0 col-span-4 lg:!mb-0">
          <Banner />
        
      </div>

      
        
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>
      

      <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div>

      {/* all project & ... */}

      
    </div>
  );
};

export default ProfileOverview;
