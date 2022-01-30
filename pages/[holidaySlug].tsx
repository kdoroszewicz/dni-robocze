import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { polishHolidays } from "../src/workDaysUtils";
import slugify from "slugify";
import { Heading, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";

const holidays = polishHolidays.getHolidays();

const HolidayPage = ({ holiday }) => {
  console.log(
    "🚀 ~ file: [holidaySlug].tsx ~ line 9 ~ HolidayPage ~ holiday",
    holiday
  );

  return (
    <>
      <Stack>
        <Heading as="h1" mb={2}>
          {holiday.name}
        </Heading>
        <Text>
          Kiedy jest {holiday.name}?{" "}
          {`${holiday.name} wypada ${format(
            new Date(holiday.date),
            "dd.MM.yyyy"
          )}`}
        </Text>
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { holidaySlug } = context.params;
  const holiday = holidays.find(
    (holiday) =>
      slugify(holiday.name, {
        lower: true,
      }) === holidaySlug
  );

  return {
    props: {
      holiday: JSON.parse(JSON.stringify(holiday)),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = holidays.map((holiday) => ({
    params: {
      holidaySlug: slugify(holiday.name, {
        lower: true,
      }),
    },
  }));
  console.log(paths);

  return {
    paths,
    fallback: true,
  };
};

export default HolidayPage;
