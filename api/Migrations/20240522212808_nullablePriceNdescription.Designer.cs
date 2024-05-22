﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using barbershouse.api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(DbDataContext))]
    [Migration("20240522212808_nullablePriceNdescription")]
    partial class nullablePriceNdescription
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("barbershouse.api.Models.Admin", b =>
                {
                    b.Property<int>("AdminID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("admin_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("AdminID"));

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("username");

                    b.HasKey("AdminID");

                    b.ToTable("admins", "public");
                });

            modelBuilder.Entity("barbershouse.api.Models.Barber", b =>
                {
                    b.Property<int>("BarberID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("barber_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("BarberID"));

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("bio");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("PhotoUrl")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("photo_url");

                    b.HasKey("BarberID");

                    b.ToTable("barbers", "public");
                });

            modelBuilder.Entity("barbershouse.api.Models.BarberWorkHours", b =>
                {
                    b.Property<int>("WorkHourID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("work_hour_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("WorkHourID"));

                    b.Property<int>("BarberId")
                        .HasColumnType("integer")
                        .HasColumnName("barber_id");

                    b.Property<int>("DayOfWeek")
                        .HasColumnType("integer")
                        .HasColumnName("day_of_week");

                    b.Property<TimeSpan>("EndTime")
                        .HasColumnType("interval")
                        .HasColumnName("end_time");

                    b.Property<TimeSpan>("StartTime")
                        .HasColumnType("interval")
                        .HasColumnName("start_time");

                    b.HasKey("WorkHourID");

                    b.HasIndex("BarberId");

                    b.ToTable("barberWorkHours", "public");
                });

            modelBuilder.Entity("barbershouse.api.Models.Booking", b =>
                {
                    b.Property<int>("BookingID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("booking_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("BookingID"));

                    b.Property<int>("BarberId")
                        .HasColumnType("integer")
                        .HasColumnName("barber_id");

                    b.Property<DateTime>("BookingDateTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("booking_date_time");

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer")
                        .HasColumnName("customer_id");

                    b.Property<int>("ServiceId")
                        .HasColumnType("integer")
                        .HasColumnName("service_id");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.HasKey("BookingID");

                    b.HasIndex("BarberId");

                    b.HasIndex("CustomerId");

                    b.HasIndex("ServiceId");

                    b.ToTable("bookings", "public");
                });

            modelBuilder.Entity("barbershouse.api.Models.Customer", b =>
                {
                    b.Property<int>("CustomerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("customer_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CustomerID"));

                    b.Property<string>("CustomerEmail")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("customer_email");

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("customer_name");

                    b.HasKey("CustomerID");

                    b.ToTable("customers", "public");
                });

            modelBuilder.Entity("barbershouse.api.Models.Service", b =>
                {
                    b.Property<int>("ServiceID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("service_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ServiceID"));

                    b.Property<int>("BarberId")
                        .HasColumnType("integer")
                        .HasColumnName("barber_id");

                    b.Property<string>("Description")
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<int>("Duration")
                        .HasColumnType("integer")
                        .HasColumnName("duration");

                    b.Property<decimal?>("Price")
                        .HasColumnType("numeric")
                        .HasColumnName("price");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("ServiceID");

                    b.HasIndex("BarberId");

                    b.ToTable("services", "public");
                });

            modelBuilder.Entity("barbershouse.api.Models.BarberWorkHours", b =>
                {
                    b.HasOne("barbershouse.api.Models.Barber", "Barber")
                        .WithMany("BarberWorkHours")
                        .HasForeignKey("BarberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Barber");
                });

            modelBuilder.Entity("barbershouse.api.Models.Booking", b =>
                {
                    b.HasOne("barbershouse.api.Models.Barber", "Barber")
                        .WithMany("Bookings")
                        .HasForeignKey("BarberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("barbershouse.api.Models.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("barbershouse.api.Models.Service", "Service")
                        .WithMany()
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Barber");

                    b.Navigation("Customer");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("barbershouse.api.Models.Service", b =>
                {
                    b.HasOne("barbershouse.api.Models.Barber", "Barber")
                        .WithMany("Services")
                        .HasForeignKey("BarberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Barber");
                });

            modelBuilder.Entity("barbershouse.api.Models.Barber", b =>
                {
                    b.Navigation("BarberWorkHours");

                    b.Navigation("Bookings");

                    b.Navigation("Services");
                });
#pragma warning restore 612, 618
        }
    }
}
