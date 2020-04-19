<template>
  <div class="content">
    <div class="page">
      <div class="page-content">
        <header class="page-header">
          <h1 class="page-title">Covid <span>🙌🏼</span> news <small>beta</small></h1>
          <h3 class="page-subtitle">Optimistic infos.</h3>
        </header>
        <div>Thanks</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Thanks",
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  background: #1d2238;
  font: 16px/1.5 "Montserrat", "Helvetica", sans-serif;
  position: relative;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
}

a {
  transition: all .2s ease-in;
}

.page {
  padding: 2rem 1rem 6rem;
}

.page-content {
  margin: 0 auto;
  max-width: 1000px;
}

.page-header {
  color: #fefefe;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-flow: row wrap;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.2rem;
  letter-spacing: .01em;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;
}
  .page-title span {
    font-size: 1.4em;
  }
  .page-title small {
    color: #777fa5;
    display: inline-block;
    font-size: .8rem;
    margin-left: .3rem;
  }

.page-subtitle {
  color: #777fa5;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1;
  margin: 1rem 0 0;
}
</style>
