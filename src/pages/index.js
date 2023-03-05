import * as React from 'react';
import {
  Card,
  Text,
  ActivityIndicator,
  MD2Colors,
  Button,
} from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import { trendingWeek as trending } from '../server';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

const Index = ({ navigation }) => {
  const [trendingItens, setTrendingItens] = React.useState({});
  const [page, setPage] = React.useState(1);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  React.useEffect(() => {
    trending().then((res) => {
      setTrendingItens(res.data);
    });
  }, []);

  React.useEffect(() => {
    trending({ page }).then((res) => {
      setTrendingItens((prev) => ({
        ...res.data,
        results: [...prev.results, ...res.data.results],
      }));
    });
  }, [page]);

  if (!fontsLoaded || !trendingItens) {
    return (
      <View style={styles.page}>
        <ActivityIndicator animating={true} color={MD2Colors.blue500} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.page}>
      <Text variant='titleLarge' style={styles.titleText}>
        Bem Vindo!
      </Text>
      <Card
        style={styles.cardPrincipal}
        id={'cardPrincipal'}
        onPress={() =>
          navigation.navigate('Details', {
            itemId: trendingItens?.results?.[0]?.id || -1,
            type: trendingItens?.results?.[0]?.media_type || '',
          })
        }
      >
        {trendingItens?.results ? (
          <>
            <Card.Cover
              source={{
                uri: trendingItens.results[0].backdrop_path
                  ? 'https://image.tmdb.org/t/p/original' +
                    trendingItens.results[0].backdrop_path
                  : '',
              }}
            />
            <Card.Content style={styles.cardContent}>
              <Text variant='titleLarge' style={styles.text}>
                {trendingItens.results[0].name || ''}
              </Text>
              <Text variant='bodyMedium' style={styles.text}>
                {trendingItens.results[0].overview}
              </Text>
            </Card.Content>
          </>
        ) : null}
      </Card>
      <View style={styles.groupCards}>
        {trendingItens?.results
          ? trendingItens.results.map((item, index) => {
              const { name, title, overview, poster_path, id, media_type } =
                item;
              return (
                <Card
                  style={styles.cards}
                  id={''}
                  key={index}
                  onPress={() =>
                    navigation.navigate('Details', {
                      itemId: id,
                      type: media_type,
                    })
                  }
                >
                  <Card.Cover
                    source={{
                      uri: poster_path
                        ? 'https://image.tmdb.org/t/p/original' + poster_path
                        : '',
                    }}
                  />
                  <Card.Content style={styles.cardContent}>
                    <Text variant='titleSmall' style={styles.text}>
                      {name || title || '-'}
                    </Text>
                  </Card.Content>
                </Card>
              );
            })
          : null}
      </View>
      {trendingItens.total_pages === trendingItens.page ? null : (
        <Button
          style={{
            maxWidth: 150,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 200,
          }}
          mode='contained'
          onPress={() => {
            setPage((page) => page + 1);
          }}
        >
          Veja Mais
        </Button>
      )}
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    color: '#000',
    margin: 10,
    padding: 10,
    fontFamily: 'Inter_400Regular',
    flex: 1,
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
  cardPrincipal: {
    backgroundColor: '#DCDCDC',
  },
  cardContent: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    gap: 10,
    fontFamily: 'Inter_400Regular',
  },
  cards: {
    flex: 1,
    flexBasis: '20%',
    margin: 10,
    minWidth: 150,
    maxWidth: 150,
    height: 300,
    backgroundColor: '#DCDCDC',
    fontFamily: 'Inter_400Regular',
  },
  text: {
    color: '#000',
    fontFamily: 'Inter_400Regular',
  },
  groupCards: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 20,
    width: 'auto',
    fontFamily: 'Inter_400Regular',
  },
});
