import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { polishHolidays } from "../src/workDaysUtils";
import slugify from "slugify";
import { Heading, Link, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import Head from "next/head";
import NextLink from "next/link";
import BackArrow from "../components/BackArrow";
const holidays = polishHolidays.getHolidays();

// Alternative paths to long holiday names
const shorthands = {
  wnmp: "wniebowziecie-najswietszej-maryi-panny",
  "3maj": "swieto-narodowe-trzeciego-maja",
  wielkanoc: "niedziela-wielkanocna",
  "swieto-niepodleglosci": "narodowe-swieto-niepodleglosci",
};

const HolidayPage = ({ holiday }) => {
  return (
    <>
      <Head>
        <title>{holiday.name} — Kalkulator Dni Roboczych</title>
        <link
          rel="canonical"
          href={`https://kalkulatordniroboczych.pl/${getSlug(holiday.name)}`}
        />
        <meta
          name="description"
          content={`${holiday.name} — Kiedy wypada święto? Czy jest wolne od pracy?`}
        />
      </Head>
      <NextLink href="/" passHref>
        <Link display="inline-flex" alignItems="center">
          <BackArrow />{" "}
          <Text ml={2} as="span">
            wróć do Kalkulatora Dni Roboczych
          </Text>
        </Link>
      </NextLink>
      <Stack spacing={2} mt={10} fontSize="xl">
        <Heading as="h1" mb={2}>
          {holiday.name}
        </Heading>
        <Text>
          Kiedy jest <strong>{holiday.name}</strong>?{" "}
          {`Święto wypada ${format(new Date(holiday.date), "dd.MM.yyyy")}`}.
        </Text>
        <Text>
          Święto jest <strong>wolne od pracy</strong>.
        </Text>
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { holidaySlug } = context.params;

  if (!holidaySlug || typeof holidaySlug !== "string") {
    return {
      notFound: true,
    };
  }

  const holidayByFullName = holidays.find(
    (holiday) => getSlug(holiday.name) === holidaySlug
  );

  if (!holidayByFullName) {
    const longName = shorthands?.[holidaySlug];
    if (longName) {
      const holidayByShortName = holidays.find(
        (holiday) => getSlug(holiday.name) === slugify(longName)
      );
      if (holidayByShortName) {
        return {
          props: {
            holiday: JSON.parse(JSON.stringify(holidayByShortName)),
          },
        };
      }
    }

    return {
      notFound: true,
    };
  }

  return {
    props: {
      holiday: JSON.parse(JSON.stringify(holidayByFullName)),
    },
  };
};

const getSlug = (holidayName: string) => slugify(holidayName, { lower: true });

export const getStaticPaths: GetStaticPaths = async () => {
  const holidayPaths = holidays.map((holiday) =>
    slugify(holiday.name, {
      lower: true,
    })
  );

  const shorthandsPaths = Object.keys(shorthands).map((shorthand) => shorthand);

  const paths = [...holidayPaths, ...shorthandsPaths].map((path) => ({
    params: {
      holidaySlug: path,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default HolidayPage;
