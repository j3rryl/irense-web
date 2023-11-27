"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { useEffect, useState } from "react";
import GraduateIcon from "../components/ui/icons/sidebar/graduate-icon";
import SchoolIcon from "../components/ui/icons/sidebar/school-icon";
import UsersIcon from "../components/ui/icons/sidebar/users-icon";
import AddUserIcon from "../components/ui/icons/sidebar/add-user-icon";
import CashOnlyIcon from "../components/ui/icons/sidebar/cash-only-icon";
import TeacherIcon from "../components/ui/icons/sidebar/teacher-icon";
import StandingIcon from "../components/ui/icons/sidebar/standing-icon";
import UpShortIcon from "../components/ui/icons/sidebar/up-short-icon";
import DownShortIcon from "../components/ui/icons/sidebar/down-short-icon";
import PieIcon from "../components/ui/icons/sidebar/pie-icon";
import { Select, SelectItem } from "@nextui-org/react";
import EnrollmentChart from "../components/ui/charts/enrollment";
import DuoPieChart from "../components/ui/charts/pie-chart";
import MultiPie from "../components/ui/charts/multi-pie";
import SimpleLineChart from "../components/ui/charts/line-chart";

const Page = () => {
  const [activeCard, setActiveCard] = useState(null);
  useEffect(() => {}, []);
  const list = [
    {
      key: 1,
      title: "Number of Schools",
      quantity: 0,
      percentage: 9,
      logo: <SchoolIcon />,
      end: <UpShortIcon />,
    },
    {
      key: 2,
      title: "Enrolled Learners",
      quantity: 0,
      percentage: 3.48,
      logo: <GraduateIcon />,
      end: <DownShortIcon />,
    },
    {
      key: 3,
      title: "Number of Teachers",
      quantity: 0,
      percentage: 12,
      logo: <TeacherIcon />,
      end: <UpShortIcon />,
    },
    {
      key: 4,
      title: "Learners with Disability",
      quantity: 0,
      percentage: 1.02,
      logo: <StandingIcon />,
      end: <PieIcon />,
    },
    {
      key: 5,
      title: "Eligible girls for CT",
      quantity: 0,
      percentage: 9,
      logo: <UsersIcon />,
      end: <UpShortIcon />,
    },
    {
      key: 6,
      title: "Validated girls for CT",
      quantity: 0,
      percentage: 3.48,
      logo: <AddUserIcon />,
      end: <DownShortIcon />,
    },
    {
      key: 7,
      title: "Approved Expenditure",
      quantity: 0,
      percentage: 1.02,
      logo: <CashOnlyIcon />,
      end: <PieIcon />,
    },
  ];

  const years = [
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
  ];
  return (
    <>
      <Card className="mx-5">
        <CardBody>
          <div className="flex justify-between items-center my-6">
            <h3 className=""></h3>
            <Select
              color="primary"
              label="Select year"
              placeholder="Select a year"
              defaultSelectedKeys={["2023"]}
              className="max-w-xs"
            >
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
            {list.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() =>
                  activeCard === item.key
                    ? setActiveCard(null)
                    : setActiveCard(item.key)
                }
              >
                <CardBody
                  className={`overflow-visible p-5 ${
                    activeCard == item.key ? "bg-primary-900" : "bg-white"
                  }`}
                >
                  <div className="flex justify-evenly">
                    <div>
                      <p
                        className={`!uppercase text-sm ${
                          activeCard !== item.key
                            ? "text-primary-900"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="text-primary">{item.quantity}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm ">{item.end}</span>
                        <small
                          style={{
                            color:
                              item.percentage >= 9
                                ? "#C9DD81"
                                : item.percentage >= 3.48
                                ? "#F5365C"
                                : "#11CDEF",
                          }}
                        >
                          {item.percentage}% Schools since last year
                        </small>
                      </div>
                    </div>
                    <div
                      className={`w-10 h-10 flex justify-center items-center rounded-full overflow-hidden ${
                        activeCard !== item.key
                          ? "bg-primary-900"
                          : " bg-gray-200"
                      }`}
                    >
                      {item?.logo}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
      <Card className="mx-5">
        <CardBody>
          <h4>Learner Enrollment</h4>
          <hr className="my-3" />
          <div className="flex justify-between items-center">
            <div className="!w-full h-96">
              <EnrollmentChart />
            </div>
            <div className="!w-full flex justify-between items-center">
              <div className="!w-full h-96">
                <h4>Distribution by Gender</h4>
                <DuoPieChart />
              </div>
              <div className="!w-full h-96">
                <h4>Disability by Gender</h4>
                <DuoPieChart />
              </div>
            </div>
          </div>
          <div className="!w-1/2 h-96">
            <h4>Disability by state</h4>
            <MultiPie />
          </div>
        </CardBody>
      </Card>

      <Card className="mx-5">
        <CardBody>
          <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 mb-5">
            <Card shadow="sm" isPressable>
              <CardHeader className="bg-primary uppercase text-white text-sm">
                Schools Reporting
              </CardHeader>
              <CardBody className={`overflow-visible p-5 `}>
                <p>2348</p>
              </CardBody>
            </Card>
            <Card shadow="sm" isPressable>
              <CardHeader className="bg-primary uppercase text-white text-sm">
                Reported Attendance
              </CardHeader>
              <CardBody className={`overflow-visible p-5 `}>
                <p>2348</p>
              </CardBody>
            </Card>
            <Card shadow="sm" isPressable>
              <CardHeader className="bg-primary uppercase text-white text-sm">
                Reached Threshold (≥5)
              </CardHeader>
              <CardBody className={`overflow-visible p-5 `}>
                <p>2348</p>
              </CardBody>
            </Card>
            <Card shadow="sm" isPressable>
              <CardHeader className="bg-primary uppercase text-white text-sm">
                Missed Threshold
              </CardHeader>
              <CardBody className={`overflow-visible p-5 `}>
                <p>2348</p>
              </CardBody>
            </Card>
          </div>
          <div className="!w-full h-96">
            {/* <h4>Disability by state</h4> */}
            <SimpleLineChart />
          </div>

          <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 my-5">
            <Card shadow="sm" isPressable>
              <CardBody
                className={`overflow-visible p-5 bg-primary-900
                }`}
              >
                <div className="flex justify-evenly">
                  <div>
                    <p
                      className={`!uppercase text-sm text-white
                      }`}
                    >
                      Learners Present Today
                    </p>
                    <p className="text-primary">350, 897</p>
                  </div>
                  <div className="w-10 h-10 flex justify-center items-center rounded-full overflow-hidden bg-gray-200">
                    <span className="text-sm ">
                      <UsersIcon />
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card shadow="sm" isPressable>
              <CardBody
                className={`overflow-visible p-5 bg-primary-900
                }`}
              >
                <div className="flex justify-evenly">
                  <div>
                    <p
                      className={`!uppercase text-sm text-white
                      }`}
                    >
                      Learners Absent Today
                    </p>
                    <p className="text-primary">2,356</p>
                  </div>
                  <div className="w-10 h-10 flex justify-center items-center rounded-full overflow-hidden bg-gray-200">
                    <span className="text-sm ">
                      <UsersIcon />
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card shadow="sm" isPressable>
              <CardBody
                className={`overflow-visible p-5 bg-primary-900
                }`}
              >
                <div className="flex justify-evenly">
                  <div>
                    <p
                      className={`!uppercase text-sm text-white
                      }`}
                    >
                      Schools Reported Today
                    </p>
                    <p className="text-primary">924</p>
                  </div>
                  <div className="w-10 h-10 flex justify-center items-center rounded-full overflow-hidden bg-gray-200">
                    <span className="text-sm ">
                      <SchoolIcon />
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>

      <Card className="mx-5">
        <CardBody>
          <h4>Teachers</h4>
          <hr className="my-3" />
          <div className="!w-1/2 h-96">
            <h4>Distribution by state</h4>
            <MultiPie />
          </div>
        </CardBody>
      </Card>
      <Card className="mx-5">
        <CardBody>
          <h4>DISABILITY MATRIX</h4>
          <hr className="my-3" />
          <div className="!w-1/2 h-96">
            <h4>Distribution by state</h4>
            <MultiPie />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Page;
