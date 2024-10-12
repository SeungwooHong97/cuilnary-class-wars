export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			bookmark: {
				Row: {
					id: number;
					restaurant_id: string | null;
					user_id: string | null;
				};
				Insert: {
					id: number;
					restaurant_id?: string | null;
					user_id?: string | null;
				};
				Update: {
					id?: number;
					restaurant_id?: string | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "bookmark_restaurant_id_fkey";
						columns: ["restaurant_id"];
						isOneToOne: false;
						referencedRelation: "restaurant";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "bookmark_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["id"];
					}
				];
			};
			chef: {
				Row: {
					chef_class: string | null;
					chef_img_url: string | null;
					chef_name: string;
					created_at: string;
					description: string | null;
					id: string;
				};
				Insert: {
					chef_class?: string | null;
					chef_img_url?: string | null;
					chef_name: string;
					created_at?: string;
					description?: string | null;
					id?: string;
				};
				Update: {
					chef_class?: string | null;
					chef_img_url?: string | null;
					chef_name?: string;
					created_at?: string;
					description?: string | null;
					id?: string;
				};
				Relationships: [];
			};
			restaurant: {
				Row: {
					address: string | null;
					chef_name: string | null;
					description: string | null;
					id: string;
					latitude: string | null;
					longitude: string | null;
					restaurant_img_url: string | null;
					restaurant_name: string;
					star: number | null;
				};
				Insert: {
					address?: string | null;
					chef_name?: string | null;
					description?: string | null;
					id?: string;
					latitude?: string | null;
					longitude?: string | null;
					restaurant_img_url?: string | null;
					restaurant_name: string;
					star?: number | null;
				};
				Update: {
					address?: string | null;
					chef_name?: string | null;
					description?: string | null;
					id?: string;
					latitude?: string | null;
					longitude?: string | null;
					restaurant_img_url?: string | null;
					restaurant_name?: string;
					star?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: "restaurant_chef_name_fkey";
						columns: ["chef_name"];
						isOneToOne: false;
						referencedRelation: "chef";
						referencedColumns: ["chef_name"];
					}
				];
			};
			reviews: {
				Row: {
					created_at: string | null;
					id: string;
					restaurant_id: string | null;
					review_content: string | null;
					star: number | null;
					user_id: string | null;
				};
				Insert: {
					created_at?: string | null;
					id: string;
					restaurant_id?: string | null;
					review_content?: string | null;
					star?: number | null;
					user_id?: string | null;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					restaurant_id?: string | null;
					review_content?: string | null;
					star?: number | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "reviews_restaurant_id_fkey";
						columns: ["restaurant_id"];
						isOneToOne: false;
						referencedRelation: "restaurant";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "reviews_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["id"];
					}
				];
			};
			user: {
				Row: {
					created_at: string;
					id: string;
					profile_img: string | null;
					updated_at: string | null;
					user_email: string | null;
					user_name: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					profile_img?: string | null;
					updated_at?: string | null;
					user_email?: string | null;
					user_name?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					profile_img?: string | null;
					updated_at?: string | null;
					user_email?: string | null;
					user_name?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "user_user_id_fkey";
						columns: ["id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
			PublicSchema["Views"])
	? (PublicSchema["Tables"] &
			PublicSchema["Views"])[PublicTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
	? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
	? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
	? PublicSchema["Enums"][PublicEnumNameOrOptions]
	: never;
