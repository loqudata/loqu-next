import React from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import { Link } from "./Link";

export const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const active = router.route == href;
  return (
    <Link href={href} chakraProps={{ _hover: { textDecoration: "none" } }}>
      <Text
        color={active ? "green.600" : "gray.500"}
        _hover={{ color: !active ? "gray.700" : "" }}
        fontWeight={active ? "semibold" : "medium"}
      >
        {children}
      </Text>
    </Link>
  );
};
