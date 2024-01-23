import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostsData {
  id: string;
  date: string;
  title: string;
  content: string;
}


// markdown이 위치해 있는 폴더
const postsDirectory = path.join(process.cwd(), 'pages/posts');

export function getSortedPostsData(): PostsData[] {
  const fileNames = fs.readdirSync('/Users/b9/bonzonkim/github.com/next-ssg/pages/posts');
  const allPostsData: PostsData[] = fileNames.map((fileName) => {
    // '.md'를 지우고 id에 저장 id => 파일 이름
    const id = fileName.replace(/\.md$/, '');

    // id에 담긴 파일을 문자열로 읽습니다.
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // gray-matter 를 이용해 markdown을 파싱합니다.
    const matterResult = matter(fileContents);

    return {
      id,
      date: matterResult.data.date,
      title: matterResult.data.title,
      content: matterResult.content
    }
  })
  
  // 파일의 date값 순서로 정렬합니다.
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  })
}



