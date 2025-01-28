import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import PaymentList from './PaymentList';

function Payment() {
    return (
        <>
          <Breadcrumb pageName="Payment" />
          <div className="flex flex-col gap-10">
            {/* <TableThree /> */}
            <PaymentList />
          </div>
        </>
      );
}

export default Payment