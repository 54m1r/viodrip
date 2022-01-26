/*
 * Main and demo navigation arrays
 */

export default {
  'demo': [
    {
      name: 'Sportwetten',
      to: '/bets',
      icon: 'fa fa-baseball-ball',
    },
    {
      name: 'Roulette',
      to: '/roulette',
      icon: 'fa fa-tablets',
    },
    {
      name: 'Crash',
      to: '/crash',
      icon: 'fa fa-chart-line',
    },
    {
      name: 'Transaktionen',
      icon: 'fa fa-money-bill-wave',
      to: '/transactions',
      sub: [
        {
          name: 'Alle Transaktionen',
          to: '/transactions',
          badge: 3,
          'badge-variant': 'info'
        },
        {
          name: 'Ausstehend',
          to: '/transactions/pending',
          badge: 1,
          'badge-variant': 'warning'
        },
        {
          name: 'Abgeschlossen',
          to: '/transactions/completed',
          badge: 2,
          'badge-variant': 'success'
        },
        {
          name: 'Geld Aufladen',
          to: '/transactions/charge',
          icon: 'fa fa-plus'
        },
        {
          name: 'Geld Abheben',
          to: '/transactions/absolve',
          icon: 'fa fa-minus'
        }
      ]
    },
  ]
}
