"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React, { useEffect, useState } from "react";
import UsersIcon from "../components/icons/users-icon";
import AddUserIcon from "../components/icons/add-user-icon";
import CashOnlyIcon from "../components/icons/cash-only-icon";
import TeacherIcon from "../components/icons/teacher-icon";
import StandingIcon from "../components/icons/standing-icon";
import UpShortIcon from "../components/icons/up-short-icon";
import DownShortIcon from "../components/icons/down-short-icon";
import PieIcon from "../components/icons/pie-icon";
import { Select, SelectItem } from "@nextui-org/react";
import GraduateIcon from "../components/icons/graduate-icon";
import SchoolIcon from "../components/icons/school-icon";

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

    </>
  );
};

export default Page;
