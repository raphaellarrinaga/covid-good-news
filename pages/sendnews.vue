<template>
  <div class="content">
    <div class="page">
      <div class="page-content">
        <header class="page-header">
          <h1 class="page-title">Covid <span>🙌🏼</span> news <small>beta</small></h1>
          <h3 class="page-subtitle">Optimistic infos.</h3>
        </header>
        <div class="news">


    <form name="news-submit"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          @submit.prevent="handleSubmit"
          enctype="multipart/form-data">
      <input type="hidden" name="form-name" value="news-submit" />
      <div class="form-item">
        <input
            class="text-input"
            type="text"
            placeholder="Add your url"
            name="url"
            @input="ev => url = ev.target.value"
            >
        <button type="submit" class="submit-button">Send</button>
        <!-- <label>
          Url:
        </label> -->
      </div>
    </form>
    <div>
      {{ formMessage }}
    </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      url: '',
      formMessage: ''
    };
  },
  computed: {
    form() {
      return {
        url: this.url,
      }
    },
  },
  methods: {
    encode(data) {
      const formData = new FormData();

      for (const key of Object.keys(data)) {
        formData.append(key, data[key]);
      }

      return formData;
    },
    handleSubmit() {
      const self = this

      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      };

      axios.post(
        "/",
        self.encode({
          'form-name': 'news-submit',
            ...self.form,
        }),
        axiosConfig
      )
      .then(function (response) {
        console.log(self.form);
        console.log(response);
        self.formMessage = "Thank you!";
      })
      .catch(function (error) {
        console.log(error);
        console.log(response.error);
        self.formMessage = response.error;
      });
    }
  }
};
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

.form-item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  max-width: 30rem;
}

.text-input {
  background: #151929;
  color: white;
  flex: 1;
  border: none;
  border-radius: 2px;
  padding: .25rem .3rem;
  font-size: 1rem;
}
</style>
