import * as React from 'react';
import { Text, Button } from 'react-native-paper';
import { StyleSheet, View, Image, Linking, ScrollView } from 'react-native';
import { details } from '../server';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

const Details = ({ route }) => {
  const { itemId, type } = route.params;
  const [trendingItens, setTrendingItens] = React.useState([]);
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });
  React.useEffect(() => {
    details({ itemId, type }).then((res) => {
      setTrendingItens({ ...res.data });
    });
  }, []);
  const {
    name,
    genres,
    homepage,
    overview,
    poster_path,
    production_companies,
    tagline,
    vote_average,
    networks,
    number_of_seasons,
    first_air_date,
    created_by,
    title,
    runtime,
    budget,
    revenue,
  } = trendingItens;

  return (
    <ScrollView style={{ ...styles.page }}>
      <Text variant="titleLarge" style={styles.titleText}>
        {name || title || ""}
      </Text>
      <View style={styles.grid}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: poster_path
                ? "https://image.tmdb.org/t/p/w600_and_h900_face" + poster_path
                : "",
            }}
            style={{
              width: 120,
              height: 200,
              borderRadius: 10,
              resizeMode: "cover",
            }}
          ></Image>
          <Text
            variant="bodySmall"
            style={{ textAlign: "center", color: "#000", padding: 10 }}
          >
            {tagline}
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          {created_by ? (
            <Text style={styles.text} variant="bodyMedium">
              Criador:{" "}
              <Text style={styles.text} variant="bodySmall">
                {created_by
                  .map((item, idx) => {
                    return item.name;
                  })
                  .join(", ") || "-"}
              </Text>
            </Text>
          ) : null}
          <Text style={styles.text} variant="bodyMedium">
            Nota:{" "}
            <Text
              variant="bodySmall"
              style={
                vote_average < 5
                  ? {
                      backgroundColor: "red",
                      padding: 5,
                      borderRadius: 10,
                      ...styles.text,
                    }
                  : vote_average > 5 && vote_average < 8
                  ? {
                      backgroundColor: "yellow",
                      padding: 5,
                      borderRadius: 10,
                      ...styles.text,
                    }
                  : {
                      backgroundColor: "green",
                      padding: 5,
                      borderRadius: 10,
                      ...styles.text,
                    }
              }
            >
              <Text style={styles.text} variant="bodySmall">
                {Number(vote_average).toFixed(2) || "-"}
              </Text>
            </Text>
          </Text>
          <Text style={styles.text} variant="bodyMedium">
            Gênero(s):{" "}
            <Text style={styles.text} variant="bodySmall">
              {genres ? genres.map((item) => item.name).join(", ") : "-"}
            </Text>
          </Text>
          {first_air_date ? (
            <Text style={styles.text} variant="bodyMedium">
              Lançamento:{" "}
              <Text style={styles.text} variant="bodySmall">
                {new Date(first_air_date).toLocaleString("pt-BR", {
                  dateStyle: "short",
                }) || "-"}
              </Text>
            </Text>
          ) : null}
          {number_of_seasons ? (
            <Text style={styles.text} variant="bodyMedium">
              Temporadas:{" "}
              <Text style={styles.text} variant="bodySmall">
                {number_of_seasons}
              </Text>
            </Text>
          ) : null}
          {runtime ? (
            <Text style={styles.text} variant="bodyMedium">
              Duração:{" "}
              <Text style={styles.text} variant="bodySmall">
                {runtime} Minutos
              </Text>
            </Text>
          ) : null}
          {budget ? (
            <Text style={styles.text} variant="bodyMedium">
              Orçamento:{" "}
              <Text style={styles.text} variant="bodySmall">
                {Number(budget).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || "-"}
              </Text>
            </Text>
          ) : null}
          {revenue ? (
            <Text style={styles.text} variant="bodyMedium">
              Receita:{" "}
              <Text style={styles.text} variant="bodySmall">
                {Number(revenue).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || "-"}
              </Text>
            </Text>
          ) : null}

          <Text style={styles.text} variant="bodySmall">
            {overview}
          </Text>
          {networks || production_companies ? (
            <View
              style={{
                display: "flex",
                flexFlow: "wrap",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              {type === "tv"
                ? networks.map((item, idx) => {
                    return (
                      <View
                        key={idx}
                        style={{
                          gap: 5,
                          padding: 10,
                          height: 100,
                          width: 100,
                        }}
                      >
                        <Image
                          source={{
                            uri: item.logo_path
                              ? "https://image.tmdb.org/t/p/w200" +
                                item.logo_path
                              : "https://picsum.photos/700",
                          }}
                          style={{
                            width: 75,
                            height: 50,
                            resizeMode: "contain",
                          }}
                        ></Image>
                      </View>
                    );
                  })
                : production_companies.map((item, idx) => {
                    return (
                      <View
                        key={idx}
                        style={{
                          gap: 5,
                          padding: 10,
                          height: 100,
                          width: 100,
                        }}
                      >
                        <Image
                          source={{
                            uri: item.logo_path
                              ? "https://image.tmdb.org/t/p/w200" +
                                item.logo_path
                              : "https://picsum.photos/700",
                          }}
                          style={{
                            width: 100,
                            height: 50,
                            resizeMode: "contain",
                          }}
                        ></Image>
                      </View>
                    );
                  })}
            </View>
          ) : null}
        </View>
        {homepage ? (
          <Button
            style={{ maxWidth: 200, alignSelf: "center" }}
            mode="contained"
            onPress={() => {
              Linking.openURL(homepage);
            }}
          >
            Veja Mais
          </Button>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    color: '#000',
    margin: 10,
    padding: 10,
    fontFamily: 'Inter_400Regular',
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#000',
    fontFamily: 'Inter_400Regular',
    fontWeight: 'bold',
  },
  text: {
    color: '#000',
    fontFamily: 'Inter_400Regular',
  },
  grid: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: 'Inter_400Regular',
    marginBottom: 50,
  },
});
