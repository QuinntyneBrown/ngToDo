namespace ngToDo.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<ngToDo.Server.Data.EF.ToDoContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(ngToDo.Server.Data.EF.ToDoContext context)
        {
            UserConfiguration.Seed(context);
            ToDoConfiguration.Seed(context);
        }
    }
}
