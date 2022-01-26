<template>
  <div>
    <!-- Page Content -->
    <div class="content">
      <base-block title="Alle Transaktionen">
        <template #options>
          <b-button to="/transactions/charge" size="sm" variant="success">Geld Einzahlen</b-button>
          <b-button to="/transactions/absolve" size="sm" variant="warning">Geld Auszahlen</b-button>
        </template>
        <b-table-simple responsive table-class="table-vcenter">
          <b-thead>
            <b-tr>
              <b-th>Name</b-th>
              <b-th class="d-none d-sm-table-cell" style="width: 15%;">Access</b-th>
              <b-th class="text-center" style="width: 100px;">Actions</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="user in users.slice(0, 6)" :key="user.id">
              <b-td class="font-w600 font-size-sm">
                <a :href="`${user.href}`">
                  {{ user.name }}
                </a>
              </b-td>
              <b-td class="d-none d-sm-table-cell">
                <b-badge :variant="user.labelVariant">{{ user.labelText }}</b-badge>
              </b-td>
              <b-td class="text-center">
                <b-button-group>
                  <b-button size="sm" variant="light">
                    <i class="fa fa-fw fa-pencil-alt"></i>
                  </b-button>
                  <b-button size="sm" variant="light">
                    <i class="fa fa-fw fa-times"></i>
                  </b-button>
                </b-button-group>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </base-block>
    </div>
    <!-- END Page Content -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        users: [
          {
            id: 1,
            name: 'Adam McCoy',
            href: 'javascript:void(0)',
            labelVariant: 'success',
            labelText: 'VIP',
            rowVariant: 'secondary'
          },
          {
            id: 2,
            name: 'Betty Kelley',
            href: 'javascript:void(0)',
            labelVariant: 'info',
            labelText: 'Business',
            rowVariant: ''
          },
          {
            id: 3,
            name: 'Jesse Fisher',
            href: 'javascript:void(0)',
            labelVariant: 'primary',
            labelText: 'Personal',
            rowVariant: 'primary'
          },
          {
            id: 4,
            name: 'Ryan Flores',
            href: 'javascript:void(0)',
            labelVariant: 'warning',
            labelText: 'Trial',
            rowVariant: ''
          },
          {
            id: 5,
            name: 'Alice Moore',
            href: 'javascript:void(0)',
            labelVariant: 'danger',
            labelText: 'Disabled',
            rowVariant: 'warning'
          },
          {
            id: 6,
            name: 'Scott Young',
            href: 'javascript:void(0)',
            labelVariant: 'success',
            labelText: 'VIP',
            rowVariant: ''
          },
          {
            id: 7,
            name: 'Ralph Murray',
            href: 'javascript:void(0)',
            labelVariant: 'danger',
            labelText: 'Disabled',
            rowVariant: 'danger'
          },
          {
            id: 8,
            name: 'Marie Duncan',
            href: 'javascript:void(0)',
            labelVariant: 'warning',
            labelText: 'Trial',
            rowVariant: ''
          },
          {
            id: 9,
            name: 'Helen Jacobs',
            href: 'javascript:void(0)',
            labelVariant: 'primary',
            labelText: 'Personal',
            rowVariant: 'info'
          },
          {
            id: 10,
            name: 'Carl Wells',
            href: 'javascript:void(0)',
            labelVariant: 'info',
            labelText: 'Business',
            rowVariant: ''
          },
          {
            id: 11,
            name: 'Jose Mills',
            href: 'javascript:void(0)',
            labelVariant: 'success',
            labelText: 'VIP',
            rowVariant: 'success'
          }
        ]
      }
    }
  }
</script>

