import React, { useState, useEffect } from "react";

import { Box, Text, Flex, Spinner, Badge } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [currentPosition, setCurrentPosition] = useState({});
  const [places, setPlaces] = useState([]);
  // Retrieving User Location
  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const isEmptyObj = (obj) => {
    for (const i in obj) return false;
    return true;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    if (isEmptyObj(currentPosition)) return;
    const { lat, lng } = currentPosition;
    const values = lat + "," + lng;
    axios
      .get(
        `https://krya-media-assessment.herokuapp.com/api/v1/search-places?ll=${values}`
      )
      .then((res) => {
        const { data } = res;
        setPlaces([...data]);
      });
  }, [currentPosition]);

  const innerBoxStyles = {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",

    color: "white",
    textShadow: "0 0 20px black",
    fontWeight: "bold",
    fontSize: "20px",
  };

  return (
    <Box
      as="section"
      width="full"
      textAlign={"center"}
      py={["3", "6"]}
      px={["3", "6"]}
    >
      <Text
        fontSize={["24", "32"]}
        fontWeight="bold"
        textTransform="capitalize"
      >
        Foursquare in your location
      </Text>
      {!isEmptyObj(currentPosition) && (
        <Text fontSize={["16", "24"]}>
          ({currentPosition.lat}, {currentPosition.lng})
        </Text>
      )}

      <Badge px={["3", "6"]} fontSize={["16", "24"]} my={6}>
        Search Location
      </Badge>

      <Flex
        width="full"
        gap={2}
        wrap="wrap"
        align={"center"}
        justify="center"
        minHeight="90vh"
        my={4}
      >
        {places?.length === 0 ? (
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.600"
            size="xl"
          />
        ) : (
          places.map((place, index) => {
            const { photoUrl, nameOfVenue } = place;
            return (
              <Box
                key={index}
                sx={innerBoxStyles}
                w={["100%", "49%"]}
                // w={"450px"}
                height="350px"
                bgImage={photoUrl}
                bgPosition="center"
                bgSize={"cover"}
                bgRepeat="no-repeat"
                p={2}
              >
                <Text
                  textAlign="left"
                  fontWeight="semibold"
                  width="full"
                  lineHeight="tight"
                >
                  {nameOfVenue}
                </Text>
              </Box>
            );
          })
        )}
      </Flex>
    </Box>
  );
}

export default App;
