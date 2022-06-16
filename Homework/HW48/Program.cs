using MySql.Data.MySqlClient;
using System.Data;
using System;
namespace Squal {
    public class Squealer {
        static void Main(string[] args) {
            new Squealer();
        
        }
        public Squealer() {
            createQuery();
        
        }
        public MySqlConnection getConnection() {
            string conStr = @"server=localhost;user=root;database=recipes_DB;password=";
            MySqlConnection con = new MySqlConnection(conStr);
            return con;
        }

        public void createQuery() {
            try {
                using (MySqlConnection con = getConnection()) {
                    con.Open();

                    var cmd = new MySqlCommand();
                    cmd.Connection = con;
                    cmd.CommandType = CommandType.Text;

                    string sql = @"
                    SELECT r.id, r.name
                    FROM recipes r";
                    cmd.CommandText = sql;

                    MySqlDataReader rdr = cmd.ExecuteReader();


                    MySqlCommand get_recipe_calories = new MySqlCommand("get_recipe_calories", con);
                    get_recipe_calories.CommandType = System.Data.CommandType.StoredProcedure;

                    List<(string, int)> records = new List<(string, int)>();
                    while (rdr.Read()) {
                        records.Add((
                            rdr.GetString("name"),
                            Int32.Parse(rdr.GetString("id")
                        )));
                    }
                    rdr.Close();
                    cmd.Dispose();

                    var recipe_id_param = new MySqlParameter("recp_id", MySqlDbType.Int32);
                    get_recipe_calories.Parameters.Add(recipe_id_param);

                    var calories_param =  new MySqlParameter("cals", MySqlDbType.Float);
                    calories_param.Direction = ParameterDirection.Output;
                    get_recipe_calories.Parameters.Add(calories_param);

                    foreach (var record in records) {
                        var name = record.Item1;
                        var id = record.Item2;

                        recipe_id_param.Value = id;

                        get_recipe_calories.ExecuteNonQuery();
                        
                        float calories;
                        if (float.TryParse($"{calories_param.Value}", out calories)) {
                            Console.WriteLine($"name: {name}\t total calories: {calories}");
                        }
                        else {
                            Console.WriteLine($"name: {name}\t CALORIES_ERROR (calories_param.Value is \"{calories_param.Value}\")");
                        }
                    }
                    get_recipe_calories.Dispose();
                }
            }
            catch (MySqlException ex) {
                Console.WriteLine(ex.Message);
            }

        }
    }
}