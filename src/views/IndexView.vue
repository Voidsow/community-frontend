<template>
  <div class="index">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <post v-for="post in posts" :key="post.id" :post="post"></post>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
export default {
  components: {
    post: PostItem,
  },
  data() {
    return {
      posts: [
        {
          id: "1",
          uid: 1,
          title: "title1 lofei rjeif ejrieohn ej eru",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          commentNum: 100,
        },
        {
          id: "2",
          uid: 1,
          title: "title1 fheufh jijifej kjioji",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          commentNum: 100,
        },
        {
          id: "3",
          uid: 1,
          title: "title1 eir0jr fejin e jeir",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          commentNum: 100,
        },
        {
          id: "4",
          uid: 1,
          title: "title4 feifj ji efehnf fj",
          content: "12345",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          commentNum: 100,
        },
        {
          id: "5",
          uid: 1,
          title: "title5 fjeiufjheu jiji fnej enin fnwej enj f aenf",
          content: "12345",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          commentNum: 100,
        },
        {
          id: "6",
          uid: 1,
          title: "title6 fjief nejrn an fej nij",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          commentNum: 100,
        },
        {
          id: "7",
          uid: 1,
          title: "title7 fejij na fen n feniniejrei",
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          commentNum: 100,
        },
        {
          id: "8",
          uid: 1,
          title: "title8 fjien enrj enjr anfg wa fojfiejS",
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          commentNum: 100,
        },
        {
          id: "9",
          uid: 1,
          title: "title9 fein  jeinre eorjm enrjen rnemi d",
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          commentNum: 100,
        },
        {
          id: "10",
          uid: 1,
          title: "title10 fjeifj  jeir enjnpe ewnm jfei an fekm",
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore aspernatur dolorum cum cumque earum velit, alias voluptatum minima ab quis. Illo perferendis nostrum eligendi quos aspernatur voluptatem provident consequuntur sapiente.",
          type: 0,
          status: 1,
          score: 100,
          gmtCreate: new Date(),
          likeNum: 1,
          commentNum: 100,
        },
      ],
    };
  },
};
</script>