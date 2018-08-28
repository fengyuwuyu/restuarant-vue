<template>
  <div>
    <contacts-header :title="headerTitle" :path="headerPath"></contacts-header>
    <contacts-search :contacts="contacts"></contacts-search>
    <contacts-list
      :contacts="contacts"
      :letter="letter"
    ></contacts-list>
    <contacts-alphabet
      :contacts="contacts"
      @change="handleLetterChange"
    ></contacts-alphabet>
  </div>
</template>

<script>
import axios from 'axios'
import ContactsHeader from '@/pages/common/Header'
import ContactsSearch from './components/Search'
import ContactsList from './components/List'
import ContactsAlphabet from './components/Alphabet'
export default {
  name: 'Contacts',
  components: {
    ContactsHeader,
    ContactsSearch,
    ContactsList,
    ContactsAlphabet
  },
  data () {
    return {
      contacts: {},
      letter: '',
      headerTitle: '联系人',
      headerPath: '/'
    }
  },
  methods: {
    getContactsInfo () {
      axios.get('/api/dtUser/contacts')
        .then(this.handleGetContactsInfoSucc)
    },
    handleGetContactsInfoSucc (res) {
      res = res.data
      if (res.success && res.data) {
        const data = res.data
        this.contacts = data.contacts
      }
    },
    handleLetterChange (letter) {
      this.letter = letter
    }
  },
  mounted () {
    this.getContactsInfo()
  }
}
</script>

<style lang="stylus" scoped>

</style>
