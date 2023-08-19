using System.Text;
using RealEstateApp.Api.Model;
using RealEstateApp.Api.Service;
using RealEstateApp.Api.Middleware;
using RealEstateApp.Api.DatabaseContext;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));

ConfigurationManager configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddControllers();

builder.Services.Configure<LogDatabaseSettings>(
    builder.Configuration.GetSection("LogDatabase"));

builder.Services.AddSingleton<LogService>();

builder.Services.AddDbContext<RealEstateContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("RealEstate")));
builder.Services.AddDbContext<RealEstateIdentityContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("RealEstateIdentity")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<RealEstateIdentityContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = configuration["JWT:ValidAudience"],
        ValidIssuer = configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]!))
    };
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swagger =>
{
    // This is to generate the Default UI of Swagger Documentation  
    swagger.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Real Estate API",
        Description = ".NET 7 Web API"
    });
    // To Enable authorization using Swagger (JWT)  
    swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme." +
        "\r\n\r\n Enter 'Bearer' [space] and then your token in the text input below." +
        "\r\n\r\nExample: \"Bearer 12345abcdef\"",
    });
    swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
    .WithExposedHeaders("x-pagination")
);

if (Convert.ToBoolean(configuration["Middleware:EnableTraceMiddleware"]))
    app.UseTraceMiddleware();

if (Convert.ToBoolean(configuration["Middleware:EnablePerformanceMiddleware"]))
    app.UsePerformanceMiddleware();

if (Convert.ToBoolean(configuration["Middleware:EnableLoggingMiddleware"]))
    app.UseLoggingMiddleware();

if (Convert.ToBoolean(configuration["Middleware:EnableSerilogRequestLogging"]))
    app.UseSerilogRequestLogging();

if (Convert.ToBoolean(configuration["Middleware:EnableWebSockets"]))
    app.UseWebSockets();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
