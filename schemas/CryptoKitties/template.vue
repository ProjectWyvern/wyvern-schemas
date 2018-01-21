<template>
<v-card :hover="hover" raised style="height: 250px; width: 250px;">
  <v-card-media src="http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/ethereum.png" height="150px">
  </v-card-media>
  <v-card-title primary-title>
    <div style="width: 100%;">
      <div style="width: 100%;">
        <h3 style="display: inline-block;">NFT #{{ metadata.fields._tokenId }}</h3>
      </div>
      <div>Rinkeby ERC721 NFT for Wyvern Exchange testing.</div><br />
    </div>
  </v-card-title>
</v-card>
</template>

<script>
export default {
  name: 'CryptoKitties',
  props: ['metadata', 'hover'],
  computed: {
  }
}
</script>

<style scoped>
</style>
