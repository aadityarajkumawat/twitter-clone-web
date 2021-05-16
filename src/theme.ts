import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    config: { useSystemColorMode: false, initialColorMode: "dark" },
    components: {
        Button: {
            variants: {
                dark: {
                    backgroundColor: "#464646",
                },
                "edit-profile": {
                    backgroundColor: "#585858",
                    margin: "10px",
                    color: "white",
                    fontWeight: 400,
                    fontSize: 14,
                    _hover: { bg: "#464646" },
                },
                follow: {
                    bg: "#0066ff",
                    height: "30px",
                },
                following: {
                    bg: "#0066ff00",
                    height: "30px",
                    border: "2px solid #0066ff",
                    color: "#0066ff",
                },
            },
        },
    },
});
