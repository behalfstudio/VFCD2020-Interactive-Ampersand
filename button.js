$(document).ready(function () {
  $("#btn0").click(function () {
    currentTheme = 0;
    ps = new ParticleSystem(currentTheme);

    $(this).addClass("active");
    $("#btn1").removeClass("active");
    $("#btn2").removeClass("active");
    $("#btn3").removeClass("active");
  });

  $("#btn1").click(function () {
    currentTheme = 1;
    ps = new ParticleSystem(currentTheme);

    $(this).addClass("active");
    $("#btn0").removeClass("active");
    $("#btn2").removeClass("active");
    $("#btn3").removeClass("active");
  });

  $("#btn2").click(function () {
    currentTheme = 2;
    ps = new ParticleSystem(currentTheme);

    $(this).addClass("active");
    $("#btn1").removeClass("active");
    $("#btn0").removeClass("active");
    $("#btn3").removeClass("active");
  });

  $("#btn3").click(function () {
    currentTheme = 3;
    ps = new ParticleSystem(currentTheme);

    $(this).addClass("active");
    $("#btn1").removeClass("active");
    $("#btn2").removeClass("active");
    $("#btn0").removeClass("active");
  });

  $("#save").click(function () {
    var now = Date.now();
    var nowTimestamp = new Date(now);

    var year = String(nowTimestamp.getFullYear() - 2000),
      month = String(nowTimestamp.getMonth() + 1),
      date = String(nowTimestamp.getDate()),
      hour = String(nowTimestamp.getHours()),
      minute = String(nowTimestamp.getMinutes()),
      second = String(nowTimestamp.getSeconds());

    save(canvas, year + month + date + "_" + hour + minute + second + ".png");
  });
});
