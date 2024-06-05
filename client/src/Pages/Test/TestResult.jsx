import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance.js";
import HomeLayout from "../../Layouts/HomeLayout";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const TestResult = () => {
  const navigate = useNavigate();

  const userData = useSelector((state) => state?.auth?.data);
  const { state } = useLocation();

  const totalMarks = state?.totalMarks || 0;
  const marks = parseInt(state.totalMarks - state.obtainMarks);

  useEffect(() => {
    if (!state) {
      navigate(-1);
    }
  }, [state, navigate]);

  const generate = async () => {
    try {
      const response = await axiosInstance.post(
        "/user/generate/certificate",
        {
          userId: userData._id,
          courseId: state.courseId,
        },
        {
          responseType: "blob", // Set response type to blob to handle binary data
        }
      );

      // Create a blob URL from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url);
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  return (
    <HomeLayout>
      <div className="container font-custom mx-auto px-4 py-8 flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl font-bold mb-4 underline text-yellow-400">
          Test Result
        </h1>
        <div className="flex justify-center mb-8">
          <Pie
            data={{
              labels: ["Obtained Marks", "Remaining Marks"],
              datasets: [
                {
                  data: [totalMarks, marks],
                  backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                  ],
                  hoverBackgroundColor: [
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(255, 99, 132, 0.8)",
                  ],
                },
              ],
            }}
            width={400}
            height={300}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-bold">
            {state.result === "pass" ? (
              <div className="text-green-500 text-xl">
                Congratulations! You passed the test.
              </div>
            ) : (
              <div className="text-red-500 text-xl">
                Sorry, you failed the test.
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            {state.result === "pass" ? (
              <button className="btn btn-accent" onClick={generate}>
                Generate Certificate
              </button>
            ) : (
              <button className="btn btn-error" onClick={() => navigate(-1)}>
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default TestResult;
