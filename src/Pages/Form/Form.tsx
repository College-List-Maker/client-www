import axios from "axios";
import { getCookie } from "../../Cookie";
import { UserCollegeData } from "../../types";
import { useEffect, createContext, useState } from "react";
import {
  Button,
  Center,
  Container,
  useToast,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Page0 } from "./FormPages/Page0";
import { Page1 } from "./FormPages/Page1";
import { Page2 } from "./FormPages/Page2";
import { Page3 } from "./FormPages/Page3";
import { Page4 } from "./FormPages/Page4";
import { Page5 } from "./FormPages/Page5";
import { Page6 } from "./FormPages/Page6";
import { Page7 } from "./FormPages/Page7";
import { Page8 } from "./FormPages/Page8";
import { Page9 } from "./FormPages/Page9";
import { Page10 } from "./FormPages/Page10";
import { Page11 } from "./FormPages/Page11";
import { Page12 } from "./FormPages/Page12";
import { Step, Steps, useSteps } from "chakra-ui-steps";

const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
  { label: "Step 4" },
  { label: "Step 5" },
  { label: "Step 6" },
  { label: "Step 7" },
  { label: "Step 8" },
  { label: "Step 9" },
  { label: "Step 10" },
  { label: "Step 11" },
  { label: "Step 12" },
  { label: "Step 13" },
];

const defaultData: UserCollegeData = {
  academic: {
    gpa: -1,
    sat: -1,
    act: -1,
  },
  courseload: {
    honors: -1,
    apib: -1,
    lang: -1,
    cs: "",
    core: "",
    major: -1,
  },
  confidence: {
    extracurriculars: -1,
    essay: -1,
    awards: -1,
    recommendations: -1,
    volunteering: -1,
    works: -1,
    talents: -1,
    interviewing: -1,
    character: -1,
    interest: -1,
  },
  colleges: {
    legacy1: "",
    legacy2: "",
    legacy3: "",
    alumni1: "",
    alumni2: "",
    alumni3: "",
    feeder1: "",
    feeder2: "",
    feeder3: "",
  },
  residency: {
    zipcode: -1,
    state: "",
    country: "",
  },
  class: {
    size: -1,
    rank: -1,
  },
  adversity: {
    fgen: false,
    international: false,
    transfer: false,
  },
  collegePrefs: {
    coedImportance: -1,
    academicResourcesImportance: -1,
    facilityImportance: false,
    gender: "",
    hbcuImportance: -1,
    internshipImportance: -1,
    majorProminenceImportance: false,
    pref4yr: false,
    prefCommittedFaculty: -1,
    prefHighestDegree: -1,
    prefMajor: "",
    prefPrivateControl: false,
    prefPublicControl: false,
    prefReligion: -1,
    prefReligious: false,
    prefSexRatioF: -1,
    prefSize: -1,
    prestiegeImportance: -1,
    researchImportance: -1,
    rigorImportance: -1,
    sameGenderImportance: -1,
    studyAbroadImportance: -1,
    workStudyImportance: -1,
  },
  costPrefs: {
    costImportance: false,
    federalAidImportance: false,
    income: -1,
    prefCOA: -1,
  },
  locationPrefs: {
    locationImportance: false,
    ZIP: -1,
    curState: "",
    prefCity: "",
    prefState: "",
    prefRegion: -1,
    livingAtHome: false,
    prefLocale: -1,
    prefSummerClimate: -1,
    prefWinterClimate: -1,
  },
  successPrefs: {
    successImportance: false,
    alumniCarreerImportance: false,
    desiredEarnings: -1,
    graduationRateImportance: false,
    prefGraduationRate: -1,
    prefRetentionRate: -1,
    retentionRateImportance: false,
  },
  weights: {
    collegeWeight: -1,
    costWeight: -1,
    locationWeight: -1,
    successWeight: -1,
  },
  listLengths: {
    reaches: -1,
    safeties: -1,
    targets: -1,
  },
};

export const FormDataContext = createContext<
  [UserCollegeData, React.Dispatch<React.SetStateAction<UserCollegeData>>]
>([defaultData, () => {}]);

export function Form() {
  // useEffect below checks if user has already filled out form
  //    if has college list, redirects to college list
  /* 
    TODO: ALSO REPLACE API CALL FOR A LOCAL STORAGE VARIABLE (like in navbar)
  */
  useEffect(() => {
    axios
      .get(
        "https://collegy-server.herokuapp.com/college/get-submit-data/" +
          getCookie("visitorId=")
      )
      .then((res: any) => {
        if (res.data.length) window.location.hash = "#college-list";
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);

  const [formData, setFormData] = useState<UserCollegeData>(defaultData);

  const toast = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(
        "https://collegy-server.herokuapp.com/college/submit-data/" +
          getCookie("visitorId="),
        formData
      )
      .then((res: any) => {
        toast({
          title: "Details submitted.",
          description: "Your colleges will appear soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        axios
          .get(
            "https://collegy-server.herokuapp.com/college/set-college-list/" +
              getCookie("visitorId=")
          )
          .then(() => {
            window.location.hash = "#college-list";
          });
      })
      .catch((err: any) => {
        console.error(err);
        toast({
          title: "Error",
          description: "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  // const [currentPage, setCurrentPage] = useState(0);
  // const handleContinue = () => {
  //     setCurrentPage((prevPage) => prevPage + 1);
  // };
  // const handleBack = () => {
  //     setCurrentPage((prevPage) => prevPage - 1);
  // };
  const contents = ({ index }: { index: number }) => {
    switch (index) {
      case 0:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page0 />
            </FormDataContext.Provider>
          </>
        );
      case 1:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page1 />
            </FormDataContext.Provider>
          </>
        );
      case 2:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page2 />
            </FormDataContext.Provider>
          </>
        );
      case 3:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page3 />
            </FormDataContext.Provider>
          </>
        );
      case 4:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page4 />
            </FormDataContext.Provider>
          </>
        );
      case 5:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page5 />
            </FormDataContext.Provider>
          </>
        );
      case 6:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page6 />
            </FormDataContext.Provider>
          </>
        );
      case 7:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page7 />
            </FormDataContext.Provider>
          </>
        );
      case 8:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page8 />
            </FormDataContext.Provider>
          </>
        );
      case 9:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page9 />
            </FormDataContext.Provider>
          </>
        );
      case 10:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page10 />
            </FormDataContext.Provider>
          </>
        );
      case 11:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page11 />
            </FormDataContext.Provider>
          </>
        );
      case 12:
        return (
          <>
            <FormDataContext.Provider value={[formData, setFormData]}>
              <Page12 />
            </FormDataContext.Provider>
          </>
        );
    }
    return <></>;
  };
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <Center>
      <Container>
        <form onSubmit={handleSubmit}>
          <Flex flexDir="column" width="100%">
            <Steps display="flex" flexWrap="wrap" activeStep={activeStep}>
              {steps.map(({ label }, index) => (
                <Step label={label} key={label}>
                  {contents({ index })}
                </Step>
              ))}
            </Steps>
            {activeStep === steps.length ? (
              <Flex px={4} py={4} width="100%" flexDirection="column">
                <Heading fontSize="xl" textAlign="center">
                  Woohoo! All steps completed!
                </Heading>
                <Button mx="auto" mt={6} size="sm" onClick={reset}>
                  Reset
                </Button>
              </Flex>
            ) : (
              <Flex width="100%" justify="flex-end">
                <Button
                  isDisabled={activeStep === 0}
                  mr={4}
                  onClick={prevStep}
                  size="sm"
                  variant="ghost"
                >
                  Prev
                </Button>
                {activeStep < steps.length - 1 && (
                  <Button type="button" size="sm" onClick={nextStep}>
                    Next
                  </Button>
                )}
                {activeStep === steps.length - 1 && (
                  <Button type={"submit"} size="sm">
                    Finish
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
        </form>
      </Container>
    </Center>
  );
}