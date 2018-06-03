<template>
  <div class="navbar-hackathon">
    <!-- Logo -->
    <a href="/#/" class="navbar-hackathon-brand">
      <img src="images/logo.png" alt="logo">
    </a>
    <!-- Right Navigation -->
    <div class="navbar-hackathon-right hidden-xs hidden-sm">
      <a href="/#/" class="navbar-hackathon-item navbar-hackathon-link">Voting petitions</a>
      <a href="" class="navbar-hackathon-item navbar-hackathon-link">Petitions validated</a>
      <a href="" class="navbar-hackathon-item navbar-hackathon-link">Support us</a>
      <a href="/#/add" class="navbar-hackathon-item navbar-hackathon-link btn-navbar"> Lauch my petition </a>
      <!-- Profile picture with dropdown list -->
      <div class="navbar-hackathon-item">
        <div class="dropdown">
          <ul class="dropdown-menu dropdown-menu-right navbar-hackathon-dropdown-menu">
            <li><a href="#">Profile</a></li>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Log Out</a></li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import '@/css/navbar.css';
  import '@/css/button.css';

  export default {
    name: 'Header',
  };
</script>

<style scoped lang="scss">
</style>
