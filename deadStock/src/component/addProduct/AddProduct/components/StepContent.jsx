// components/StepContent.jsx
import BasicInfoStep from "../../basicInformationSection";
import PricingStep from "../../pricingSection";
import ImagesStep from "../../imageUpload";
import SpecificationsStep from "../../specificationSteps";
import ReviewStep from "../../reviewSteps";

const StepContent = (props) => {
  const { step, user } = props;

  switch (step) {
    case 0: return <BasicInfoStep {...props} />;
    case 1: return <PricingStep {...props} isB2BUser={user?.userType === "B2B"} />;
    case 2: return <ImagesStep {...props} />;
    case 3: return <SpecificationsStep {...props} />;
    case 4: return <ReviewStep {...props} isB2BUser={user?.userType === "B2B"} />;
    default: return null;
  }
};

export default StepContent;
