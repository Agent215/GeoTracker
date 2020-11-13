import { useEffect, useState } from "react";
import trends from "../assets/api/trends.js";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const trendsApi = async (lat,long) => {
    console.log("useResult, line 9");
    try {
      const response = await trends.get("", {
        params: {
            lat: lat,
            long: long,
        
        },
      });
      setResults(response.data);
    } catch (err) {
      setErrorMessage("Something went wrong getting trends");
    }
  };

  //bad approach: call search api when component is first rendered
  //searchApi('pasta')

  //good code that only call once when the component first rendered
  useEffect(() => {
    trendsApi(10,10);
  }, []);

  return [trendsApi, results, errorMessage];
};








// export default () => {
//     const [results, setResults] = useState([]);
//     const [errorMessage, setErrorMessage] = useState("");
  
//     const searchApi = async (searchTerm) => {
//       console.log("hi");
//       try {
//         const response = await trends.get("/search", {
//           params: {
//             limit: 50,
//             term: searchTerm,
//             location: "san jose",
//           },
//         });
//         setResults(response.data.businesses);
//       } catch (err) {
//         setErrorMessage("Something went wrong");
//       }
//     };
  
//     //bad approach: call search api when component is first rendered
//     //searchApi('pasta')
  
//     //good code that only call once when the component first rendered
//     useEffect(() => {
//       searchApi("pasta");
//     }, []);
  
//     return [searchApi, results, errorMessage];
//   };
  