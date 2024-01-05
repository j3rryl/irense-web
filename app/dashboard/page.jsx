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
      title: "Number of Tests",
      quantity: 12,
      percentage: 9,
      logo: <SchoolIcon />,
      end: <UpShortIcon />,
    },
    {
      key: 3,
      title: "Number of Physicians",
      quantity: 2,
      percentage: 12,
      logo: <TeacherIcon />,
      end: <UpShortIcon />,
    },
    {
      key: 5,
      title: "Number of Patients",
      quantity: 2,
      percentage: 9,
      logo: <UsersIcon />,
      end: <UpShortIcon />,
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
          <div className="gap-5 grid grid-cols-2 sm:grid-cols-3">
            {list.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
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
                    </div>
                    <div
                      className={`w-10 h-10 flex justify-center items-center rounded-full overflow-hidden bg-primary-900`}
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
