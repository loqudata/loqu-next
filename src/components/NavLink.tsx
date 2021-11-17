import React from "react";
import { useRouter } from 'next/router'
import { Link, Text } from "@chakra-ui/react";

export const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const active = router.route == href
  return (
    <Link href={href} _hover={{ textDecoration: "none" }}>
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
