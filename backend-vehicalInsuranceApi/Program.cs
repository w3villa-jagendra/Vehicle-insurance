var builder = WebApplication.CreateBuilder(args);


// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();


#pragma warning disable ASP0000 // Do not call 'IServiceCollection.BuildServiceProvider' in 'ConfigureServices'
var provider = builder.Services.BuildServiceProvider();
#pragma warning restore ASP0000 // Do not call 'IServiceCollection.BuildServiceProvider' in 'ConfigureServices'
var configuration = provider.GetRequiredService<IConfiguration>(); 

builder.Services.AddCors(options =>
{
    var frontendURL = configuration.GetValue<string>("frontend-url");
    options.AddDefaultPolicy(builder =>
    {
#pragma warning disable CS8604 // Possible null reference argument.
        _ = builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader();
#pragma warning restore CS8604 // Possible null reference argument.
    });
});

var app = builder.Build();





app.UseCors();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};


    
app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast(
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        )).ToArray();
      
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.MapGet("/hello", () =>
{
    var forecast = "This is the Forcast";
      
    return forecast;
})
.WithName("hello")
.WithOpenApi();




app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
