using Microsoft.OpenApi.Models;

var allowSpecificOrigins = "AllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo { Title = "openapi", Version = "v1" }); });
builder.Services.AddCors(options =>
{
    options.AddPolicy(allowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("https://eco-stocks.vercel.app")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger(c => { c.SerializeAsV2 = true; });
app.UseSwaggerUI();


app.UseHttpsRedirection();
app.UseCors(allowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();



app.Run();