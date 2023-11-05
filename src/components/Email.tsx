import React from "react";

import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Preview } from "@react-email/preview";
import { Tailwind } from "@react-email/tailwind";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Text } from "@react-email/text";
import { Heading } from "@react-email/heading";
import { Section } from "@react-email/section";
import { Button } from "@react-email/button";
interface WelcomeEmailProps {
  url: string;
}

export const WelcomeEmail = ({ url }: WelcomeEmailProps) => {
  const previewText = `Welcome to , CraftyKit!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto font-sans bg-white">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Heading className="p-0 mx-0 my-8 text-2xl font-normal text-center">
              Welcome to CraftyKit!
            </Heading>
            <Text className="text-sm">Hello,</Text>
            <Text className="text-sm">
              Thank you for signing in. Here is your link to get started:
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className=" px-5 py-3 bg-[#00A3FF] rounded text-white text-xs font-semibold no-underline text-center"
                href={url}
              >
                Get Started
              </Button>
              <Text className="text-sm mt-[16px]">
                If you did not sign up for CraftyKit, please ignore this email.
              </Text>
            </Section>
            <Text className="text-sm">
              Cheers,
              <br />
              Team TSX
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
