import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import BusinessDetails from "./BusinessDetails";

const Businesses = () => {
    return (
        <>
          <Breadcrumb pageName="Business Details" />
          <div className="flex flex-col gap-10">
            <BusinessDetails />
          </div>
        </>
      );
}

export default Businesses;