import { useEffect, useState } from "react";
import { InputController } from "./InputBox";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DisplayArea from "./DisplayArea";

const Home = () => {
  const [data, setData] = useState(Array(10).fill(""));
  const [loadingStates, setLoadingStates] = useState(Array(10).fill(false));
  const [error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    input1: Yup.string().required(),
    input2: Yup.string().required(),
    input3: Yup.string().required(),
    input4: Yup.string().required(),
    input5: Yup.string().required(),
    input6: Yup.string().required(),
    input7: Yup.string().required(),
    input8: Yup.string().required(),
    input9: Yup.string().required(),
    input10: Yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const fetchData = async (data, index) => {
    try {
      setLoadingStates((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[index] = true;
        return updatedStates;
      });
      const response = await fetch("https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud", {
        headers: {
          Accept: "image/png",
          Authorization:
            "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: data }),
      });

      const result = await response.blob();
      setData((data) => [...data, result]);
      setData((prevdata) => {
        const updateddata = [...prevdata];
        updateddata[index] = result;
        return updateddata;
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoadingStates((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[index] = false;
        return updatedStates;
      });
    }
  };

  const onSubmit = (data) => {
    Object.entries(data).forEach(([key, value], index) => {
      fetchData(value, index + 1);
    });
  };

  if (error) {
    return <div>We encountered an error. Please try again later.</div>;
  }

  console.log(loadingStates);

  const anyLoading = loadingStates.some((state) => state);

  return (
    <div className="mt-10">
      {!anyLoading && (
        <div className="flex flex-col gap-3 justify-center items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((acc, curr, i, arr) => {
            if (i % 2 === 0) {
              const pair = (
                <div key={i} className="flex gap-3">
                  <InputController
                    control={control}
                    errors={errors[`input${i + 1}`]}
                    name={`input${i + 1}`}
                    label={`input${i + 1}`}
                    type="text"
                    width="w-[200px]"
                    size="small"
                  />
                  {i + 1 < arr.length && (
                    <InputController
                      control={control}
                      errors={errors[`input${i + 2}`]}
                      name={`input${i + 2}`}
                      label={`input${i + 2}`}
                      type="text"
                      width="w-[200px]"
                      size="small"
                    />
                  )}
                </div>
              );
              acc.push(pair);
            }
            return acc;
          }, [])}
        </div>
      )}

      {!anyLoading && (
        <div className="flex justify-center items-center mt-4">
          <Button variant="contained" onClick={handleSubmit(onSubmit)} className="normal-case bg-black text-white">
            Generate
          </Button>
        </div>
      )}
      {anyLoading && (
        <div className="text-gray-500 flex justify-center my-4">
          Generating images usually takes from 30 seconds to 10 minutes. We thank you for your patience.
        </div>
      )}
      <DisplayArea images={data} loadingStates={loadingStates} />
    </div>
  );
};

export default Home;
