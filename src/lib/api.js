import { supabase } from "./supabase";

export const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .contains('published_to', ['basira'])
      .order('created_at', { ascending: false });
      console.log('Blogs' , data);
  
    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  
    return data;
  };
  