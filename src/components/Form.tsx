import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import pos from '../assets/pos.png'
import wakeel_img from '../assets/wakeel_img.png'

interface BusinessDetails {
    name: string;
    address: string;
    phone: number;
    email: string;
    bvn: number;
    cacNumber: string;
    cacDocument: File | null;
  }
  
  interface PersonalDetails {
    placeOfBirth: string;
    dateOfBirth: string;
    gender: string;
    state: string;
    localGovernment: string;
    document: File | null;
  }
  
  interface Errors {
    [key: string]: string;
  }
  

function Form() {
  
  const [accountType, setAccountType] = useState("");
  
  const [tin, setTin] = useState("");
  const [tinError, setTinError] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [otpSuccess, setOtpSuccess] = useState<string>("");


 

  const validateTIN = () => {
    if (tin.trim().length !== 10) {
      setTinError("Invalid TIN. Must be 10 characters long.");
    } else {
      setTinError("");
      setStep(3);
    }
  };

  
  





  const [step, setStep] = useState<number>(1);
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    name: "",
    address: "",
    phone: +234,
    email: "",
    bvn: 0,
    cacNumber: "",
    cacDocument: null
  });
  const [businessErrors, setBusinessErrors] = useState<Errors>({});
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    placeOfBirth: "",
    dateOfBirth: "",
    gender: "",
    state: "",
    localGovernment: "",
    document: null
  });
  const [personalErrors, setPersonalErrors] = useState<Errors>({});
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);


  const validateBusinessDetails = (): boolean => {
    const errors: Errors = {};
    if (!businessDetails.name) errors.name = "Business name is required";
    if (!businessDetails.address) errors.address = "Business address is required";
    if (!businessDetails.phone) errors.phone = "Phone number is required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(businessDetails.email)) errors.email = "Invalid email format";
    if (!businessDetails.bvn) errors.bvn = "BVN is required";
    if (!businessDetails.cacNumber.trim()) errors.cacNumber = "CAC Number is required";
    if (!businessDetails.cacDocument) errors.cacDocument = "CAC Document is required";
    
    setBusinessErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePersonalDetails = (): boolean => {
    const errors: Errors = {};
    if (!personalDetails.placeOfBirth) errors.placeOfBirth = "Place of birth is required";
    if (!personalDetails.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!personalDetails.gender) errors.gender = "Gender is required";
    if (!personalDetails.state) errors.state = "State is required";
    if (!personalDetails.localGovernment) errors.localGovernment = "Local government is required";
    if (!personalDetails.document) errors.document = "Document upload is required";
    setPersonalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 3 && validateBusinessDetails()) {
      setStep(4);
    } else if (step === 4 && validatePersonalDetails()) {
      setStep(5);
    }
  };

  const handleSubmit = () => {
    if (!acceptedTerms) {
      alert("You must accept the terms and conditions before submitting.");
      return;
    }
    alert("OTP has been sent to your registered phone number and email.");
    setStep(6);
  };

  const verifyOtp = () => {
    if (otp.length !== 6) {
      setOtpError("Invalid OTP. Must be 6 digits.");
      setOtpSuccess("");
    } else {
      setOtpError("");
      setOtpSuccess("OTP verified successfully! Account registration complete.");
    }
  };

  const resendOtp = () => {
    alert("A new OTP has been sent to your registered phone number and email.");
    setOtpError("");
    setOtpSuccess("");
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className=" hidden md:block h-200 w-300">
          <img src={pos} alt="" className="w-165 h-48 md:h-full object-cover" />
        </div>
      <Card className="w-full p-6 h-full bg-transparent border-none">
      
      <div className="flex items-center justify-center mt-2">
        <img src={wakeel_img} alt="" className="w-50"/>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-center">ONBOARDING FORM</CardTitle>
        </CardHeader>
        <CardContent>
        {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Select Account Type</h2>
              <Select onValueChange={(value) => setAccountType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Account Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-center mt-4">
                <Button onClick={() => (accountType === "corporate" ? setStep(2) : alert("Personal accounts do not require registration."))} className="mt-4 w-full text-white  bg-[#B99745] hover:bg-[#000000] rounded-4xl">Next</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Tax Identification Number</h2>
              <Input placeholder="Enter TIN" className="mb-2" value={tin} onChange={(e) => setTin(e.target.value)} />
              {tinError && <p className="text-red-600 mb-2">{tinError}</p>}
              <div className="flex justify-between mt-4">
                <Button onClick={() => setStep(1)} className="bg-white text-black border-2 hover:text-white">Back</Button>
                <Button onClick={validateTIN} className="bg-[#B99745]">Validate TIN</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-center">Business Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
              <Label className="block mt-0.1">Business Name</Label>
              <Input placeholder="Business Name" className="mt-1" value={businessDetails.name} onChange={(e) => setBusinessDetails({...businessDetails, name: e.target.value})} />
              {businessErrors.name && <p className="text-red-600 mb-1">{businessErrors.name}</p>}
              </div>
              <div>
              <label className="block mt-0.1">Business Address</label>
              <Input placeholder="Business Address" className="mb-0.5" value={businessDetails.address} onChange={(e) => setBusinessDetails({...businessDetails, address: e.target.value})} />
              {businessErrors.address && <p className="text-red-600 mb-1">{businessErrors.address}</p>}
              </div>
              <div>
              <label className="block mt-0.1">Phone Number:</label>
              <Input placeholder="Phone Number" className="mb-1" type="number" value={businessDetails.phone} onChange={(e) => setBusinessDetails({...businessDetails, phone: Number(e.target.value)})} />
              {businessErrors.phone && <p className="text-red-600 mb-1">{businessErrors.phone}</p>}
              </div>
              <div>
              <label className="block mt-0.1">Email:</label>
              <Input placeholder="Email" className="mb-1" value={businessDetails.email} onChange={(e) => setBusinessDetails({...businessDetails, email: e.target.value})} />
              {businessErrors.email && <p className="text-red-600 mb-2">{businessErrors.email}</p>}
              </div>
              <div>
              <label className="block">BVN:</label>
              <Input placeholder="BVN" className="mb-1" type="number" value={businessDetails.bvn} onChange={(e) => setBusinessDetails({...businessDetails, bvn: Number(e.target.value)})} />
              {businessErrors.bvn && <p className="text-red-600 mb-1">{businessErrors.bvn}</p>}
              </div>
              <div>
              <label className="block">CAC  No:</label>
              <Input placeholder="CAC Number" className="mb-1" value={businessDetails.cacNumber} onChange={(e) => setBusinessDetails({ ...businessDetails, cacNumber: e.target.value })} />
              {businessErrors.cacNumber && <p className="text-red-500 text-sm">{businessErrors.cacNumber}</p>}
              </div>
              <div>
              <label className="col-span-2">Upload CAC</label>
              <input type="file" className="mb-1" onChange={(e) => setBusinessDetails({ ...businessDetails, cacDocument: e.target.files ? e.target.files[0] : null })} />
              {businessErrors.cacDocument && <p className="text-red-500 text-sm">{businessErrors.cacDocument}</p>}
              </div>
             </div>
              <div className="flex justify-between mt-4">
                <Button onClick={() => setStep(2)} className="bg-white text-black hover:text-white border-2">Back</Button>
                <Button onClick={handleNext} className="bg-[#B99745]">Next</Button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
              <label className="block">Place of birth:</label>
              <Input placeholder="Place of Birth" className="mb-2" onChange={(e) => setPersonalDetails({...personalDetails, placeOfBirth: e.target.value})} />
              {personalErrors.placeOfBirth && <p className="text-red-600 mb-2">{personalErrors.placeOfBirth}</p>}
                </div>
                <div>
              <label className="block">Date of birth:</label>
              <Input type="date" className="mb-2" onChange={(e) => setPersonalDetails({...personalDetails, dateOfBirth: e.target.value})} />
              {personalErrors.dateOfBirth && <p className="text-red-600 mb-2">{personalErrors.dateOfBirth}</p>}
                </div>
                <div>
              <label className="block">Gender:</label>
              <Select onValueChange={(value) => setPersonalDetails({...personalDetails, gender: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {personalErrors.gender && <p className="text-red-600 mb-2">{personalErrors.gender}</p>}
              </div>
              <div>
              <label className="block">State:</label>
              <Input placeholder="State" className="mb-2" onChange={(e) => setPersonalDetails({...personalDetails, state: e.target.value})} />
              {personalErrors.state && <p className="text-red-600 mb-2">{personalErrors.state}</p>}
              </div>
              <div>
              <label className="block">L.G.A:</label>
              <Input placeholder="Local Government" className="mb-2" onChange={(e) => setPersonalDetails({...personalDetails, localGovernment: e.target.value})} />
              {personalErrors.localGovernment && <p className="text-red-600 mb-2">{personalErrors.localGovernment}</p>}
              </div>
              <div>
              <label className="block">Upload Passport:</label>
              <Input type="file" className="mb-2" onChange={(e) => setPersonalDetails({...personalDetails, document: e.target.files ? e.target.files[0] : null})} />
              {personalErrors.document && <p className="text-red-600 mb-2">{personalErrors.document}</p>}
              </div>
              
              </div>
              <div className="flex justify-between mt-4">
                <Button onClick={() => setStep(3)} className="bg-white text-black border-2 hover:text-white">Back</Button>
                <Button onClick={handleNext} className="bg-[#B99745]">Next</Button>
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
              <p className="text-sm text-gray-600 mb-4">
                Agents must accept terms and conditions before account submission. OTP verification is required and will be sent to the phone number and email linked to your BVN.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mb-4">Read Full Terms & Conditions</Button>
                </DialogTrigger>
                <DialogContent>
                  <h2 className="text-lg font-semibold">Full Terms and Conditions</h2>
                  <p className="text-sm leading-6 overflow-y-auto max-h-96">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum, 
                    lacus in faucibus auctor, risus mauris vehicula velit, at sollicitudin 
                    lectus lorem id ligula. Integer at justo id eros consectetur facilisis. 
                    Vestibulum euismod sapien id mi dapibus, nec tempus odio tristique. 
                    Suspendisse auctor quam vel ligula ultricies, ut auctor nisl blandit. 
                    Pellentesque habitant morbi tristique senectus et netus et malesuada 
                    fames ac turpis egestas. Integer convallis augue nec metus dictum, eu 
                    ullamcorper sapien accumsan. Vestibulum tincidunt felis ut orci tempus 
                    luctus. Donec auctor felis nec dolor elementum, non fermentum nunc 
                    venenatis. Aenean nec fringilla sapien, id fringilla neque. Curabitur 
                    dignissim magna non facilisis consectetur. Cras malesuada tortor sit 
                    amet erat dictum, nec scelerisque lorem tincidunt. Morbi malesuada 
                    vulputate sapien, a hendrerit lorem gravida eget. Sed tincidunt, risus 
                    vel suscipit sagittis, orci erat hendrerit mi, non tristique felis 
                    libero ut dui.
                  </p>
                </DialogContent>
              </Dialog>
              <div className="flex items-center mb-4">
                <Checkbox checked={acceptedTerms} onCheckedChange={() => setAcceptedTerms(!acceptedTerms)} />
                <span className="ml-2 text-sm">I accept the Terms & Conditions</span>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button onClick={() => setStep(4)}>Back</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          )}
           {step === 6 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
              <Input placeholder="Enter OTP" className="mb-2" value={otp} onChange={(e) => setOtp(e.target.value)} />
              {otpError && <p className="text-red-600 mb-2">{otpError}</p>}
              {otpSuccess && <p className="text-green-600 mb-2">{otpSuccess}</p>}
              <div className="flex justify-between mt-4">
                <Button onClick={verifyOtp} className="bg-[#B99745]">Verify OTP</Button>
                <Button onClick={resendOtp} className="">Resend OTP</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


export default Form