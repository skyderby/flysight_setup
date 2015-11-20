module.exports = Backbone.Model.extend({

  defaults: {
    // Dynamic model
    // 0 = Portable
    // 2 = Stationary
    // 3 = Pedestrian
    // 4 = Automotive
    // 5 = Sea
    // 6 = Airborne with < 1 G acceleration
    // 7 = Airborne with < 2 G acceleration
    // 8 = Airborne with < 4 G acceleration
    model: 6,

    // Measurement rate (ms)
    rate: 200,

    // Tone settings

    // Measurement mode
    // 0 = Horizontal speed
    // 1 = Vertical speed
    // 2 = Glide ratio
    // 3 = Inverse glide ratio
    // 4 = Total speed
    mode: 2,

    // Lowest pitch value
    // cm/s        in Mode 0, 1, or 4
    // ratio * 100 in Mode 2 or 3
    min: 250,

    // Highest pitch value
    // cm/s        in Mode 0, 1, or 4
    // ratio * 100 in Mode 2 or 3
    max: 400,

    // Behaviour when outside bounds
    // 0 = No tone
    // 1 = Min/max tone
    // 2 = Chirp up/down
    limits: 1,

    // Volume 0 (min) to 8 (max)
    volume: 6,

    // Rate settings

    // Determines tone rate
    //  0 = Horizontal speed
    //  1 = Vertical speed
    //  2 = Glide ratio
    //  3 = Inverse glide ratio
    //  4 = Total speed
    //  8 = Magnitude of Value 1
    //  9 = Change in Value 1
    mode_2: 2,

    // Lowest rate value
    //   cm/s          when Mode 2 = 0, 1, or 4
    //   ratio * 100   when Mode 2 = 2 or 3
    //   percent * 100 when Mode 2 = 9
    min_val_2: 300,

    // Highest rate value
    //   cm/s          when Mode 2 = 0, 1, or 4
    //   ratio * 100   when Mode 2 = 2 or 3
    //   percent * 100 when Mode 2 = 9
    max_val_2: 450,

    // Minimum rate (Hz * 100)
    min_rate: 100,

    // Maximum rate (Hz * 100)
    max_rate: 500,

    // Flatline at minimum rate
    //   0 = No
    //   1 = Yes
    flatline:  0,

    // Speech settings

    // Speech mode
    //  0 = Horizontal speed
    //  1 = Vertical speed
    //  2 = Glide ratio
    //  3 = Inverse glide ratio
    //  4 = Total speed
    sp_mode: 2,
    // Speech units
    //  0 = km/h
    //  1 = mph
    sp_units: 0,
    // Speech rate (s)
    //  0 = No speech
    sp_rate: 0,
    // Decimal places for speech
    sp_dec:    1,
    // 0 (min) to 8 (max)
    sp_volume: 6,

    // Thresholds
    // Minimum vertical speed for tone (cm/s)
    v_thresh: 1000,
    // Minimum horizontal speed for tone (cm/s)
    h_thresh: 0,

    // Miscellaneous

    // Use skydiver's airspeed
    //  0 = No
    //  1 = Yes
    use_sas: 0,
    // Timezone offset of output files in seconds
    //  -14400 = UTC-4 (EDT)
    //  -18000 = UTC-5 (EST, CDT)
    //  -21600 = UTC-6 (CST, MDT)
    //  -25200 = UTC-7 (MST, PDT)
    //  -28800 = UTC-8 (PST)
    tz_offset: 10800,

    // Initialization

    // When the FlySight is powered on
    //  0 = Do nothing
    //  1 = Test speech mode
    //  2 = Play file
    init_mode: 2,
    init_file: 0,

    // Alarm settings
    // WARNING: GPS measurements depend on very weak signals
    //  received from orbiting satellites. As such, they
    //  are prone to interference, and should NEVER be
    //  relied upon for life saving purposes.

    // UNDER NO CIRCUMSTANCES SHOULD THESE ALARMS BE
    // USED TO INDICATE DEPLOYMENT OR BREAKOFF ALTITUDE.

    // Note: Alarm elevations are given in meters above ground
    //  elevation, which is specified in DZ_Elev.

    // Alarm window (m)
    window: 150,
    // Ground elevation (m above sea level)
    dz_elev: 0,

    alarms: []
  }

});
