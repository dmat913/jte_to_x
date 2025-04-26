import { gql } from "@apollo/client";

// 日本語 to 英語 翻訳
export const TRANSLATE = gql`
  query translate($text: String!) {
    translate(text: $text) {
      translated
    }
  }
`;
