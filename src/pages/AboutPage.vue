<template>
  <div class="title text-center">
    <h1>ABOUT THE TEAM</h1>
    <br />
    <b-container>
      <b-row>
        <b-col
          ><img :src="omer" style="width: 200px; height: 200px;" />
          <h3>Omer Hofman</h3>
        </b-col>
        <b-col
          ><img :src="yiftah" style="width: 200px; height: 200px;" />
          <h3>Yiftah Szoke</h3>
        </b-col>
      </b-row>
      <h4 class="text-muted">
        We are an experienced development team with a passion for creating
        interactive and fun websites.
      </h4>
      <br />
      <h1>ABOUT THE SITE</h1>
      <h4 class="text-muted">
        This is a site that contains information on recipes of all kinds, you
        can register on the site to save favorite recipes and search for a
        specific recipe according to special parameters.
      </h4>
      <br />
      <h2>ADDITIONAL PROJECTS</h2>
      <h4>click on the link below to see other projects:</h4>
      <br />

      <a href="https://sise-web-development-environments.github.io/307832972/"
        >SITE ABOUT OMER'S GRANDMOTHER - SABINA</a
      >
      <br />

      <a href="https://sise-web-development-environments.github.io/204646913/"
        >SITE ABOUT YIFTAH'S GRANDMOTHER - HANA</a
      >
      <br />

      <a
        href="https://sise-web-development-environments.github.io/307832972_204646913/"
        >PACMAN GAME PROJECT</a
      >
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      omer:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594987228/omer_zmkfh7.jpg",
      yiftah:
        "https://res.cloudinary.com/df6ppuehr/image/upload/v1594987120/yiftah_csnzyv.jpg"
    };
  }
};
</script>

<style></style>
